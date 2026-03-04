"use server";
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import { chatExist, getUserBy, isUserChatMember } from './data';
import { ActionResult, ChatFormState, chatSchema, CreateUser, LoginUser, MessageType, UserFormState, UserType } from './definitions';
import { createSession, decrypt, deleteSession, requireUser } from './session';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { handleActionError } from './errors';

const sql = neon(process.env.DATABASE_URL ?? "");

export async function createUser(
    state: UserFormState,
    formData: FormData,
): Promise<UserFormState> {
    const validatedFields = CreateUser.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Fields do not match requires. Failed to create user.',
        };
    }

    const { username, email, password } = validatedFields.data;
    const confirmPassword = formData.get("confirm-password");
    const errors: UserFormState = {
        errors: {
            username: [],
            email: [],
            password: [],
            database: []
        },
        message: ''
    }

    try {
        const [searchUsername, searchUserEmail] = await Promise.all([
            getUserBy('username', username),
            getUserBy('email', email),
        ]);

        if (searchUsername !== null) {
            errors.errors?.username?.push("Username already exists");
        }
        if (searchUserEmail !== null) {
            errors.errors?.email?.push("Email already exists");
        }
        if (confirmPassword !== password) {
            errors.errors?.password?.push("Passwords do not match");
        }
        if (
            errors.errors?.username?.length !== 0 ||
            errors.errors?.email?.length !== 0 ||
            errors.errors?.password?.length !== 0
        ) {
            return errors
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await sql`
            INSERT INTO users (username, email, password)
            VALUES (${username}, ${email}, ${hashedPassword})
        `;

        const data: UserType | null = await getUserBy('email', email);

        if (data === null) {
            return {
                ...state,
                errors: { database: [`Database error: Faild to login new user`] },
                message: "Failed to get new User.",
            }
        }

        await createSession({
            id: data.id,
            username: data.username,
            email: data.email,
            image_url: null
        })

        return {
            errors: {},
            message: 'success'
        }

    } catch (error) {
        console.log(error)
        return {
            ...state,
            errors: { database: [`Database error`] },
            message: "Failed to Create User.",
        };
    };
};


export async function loginUser(
    state: UserFormState,
    formData: FormData
): Promise<UserFormState> {
    const validatedFields = LoginUser.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to login user',
        };
    };

    const { email, password } = validatedFields.data;

    try {
        const user = (await sql`SELECT * FROM users WHERE email = ${email} `)[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return {
                errors: {
                    email: ['Email or password is incorrect']
                },
                message: 'Login is incorrect'
            };
        }

        await createSession({
            id: user.id,
            username: user.username,
            email: user.email,
            image_url: user.image_url
        });

        return {
            errors: {},
            message: 'success'
        }

    } catch (error) {
        console.log(error);
        return {
            ...state,
            errors: { database: [`Database error`] },
            message: "Failed to Login User.",
        };
    };
};

export async function logout() {
    await deleteSession();
    redirect('/login');
};

export async function createChat(
    state: ChatFormState,
    formData: FormData
): Promise<ChatFormState> {
    const validatedFields = chatSchema.safeParse({
        chat_name: formData.get("chat_name"),
        image_url: formData.get("image_url"),
        members: formData.get("members")?.toString().split(',').filter(val => val !== '')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create chat',
        };
    };

    const { chat_name, image_url, members } = validatedFields.data;
    const isNameUsed = await chatExist(chat_name);

    if (isNameUsed) {
        return {
            errors: {
                name: ['This name is already being used'],
            },
            message: 'faild to create chat'
        };
    };


    console.log(chat_name, image_url, members);

    try {
        const userLogged = await decrypt((await cookies()).get('session')?.value).then((res) => res?.user);

        if (!userLogged) {
            revalidatePath('/home');
            return {
                errors: {},
                message: 'There is no user logged'
            }
        };

        await sql`INSERT INTO chats (name, image_url) VALUES (${chat_name}, ${image_url})`;

        const chatId = (await sql`SELECT * FROM chats WHERE name = ${chat_name}`)[0].id;

        if (!chatId) throw new Error("Chat creation failed. No ID returned.");

        if (!members.includes(userLogged?.username)) {
            await sql`INSERT INTO chat_members (user_id, chat_id) VALUES (${userLogged?.id}, ${chatId})`;
        };

        const filteredMembers = [... new Set(members)];

        for (const memberName of filteredMembers) {
            const user = await getUserBy('username', memberName);
            if (user) {
                await sql`INSERT INTO chat_members (user_id, chat_id) VALUES (${user.id}, ${chatId})`;
            }
        }

        revalidatePath('/home');
        return {
            errors: {},
            message: 'success'
        };
    } catch (error) {
        console.log(error);
        return {
            errors: { database: ['Faild to create chat'] },
            message: `Faild to create chat`
        };
    };
};

export async function createMessage(
  { text, chat_id }: { text: string; chat_id: number }
): Promise<ActionResult<MessageType>> {
    if (!(await isUserChatMember(chat_id))) {
        return { success: false, error: "Unauthorized" };
    }
    try {
        const user = await requireUser();

        const message_id = crypto.randomUUID();

        const date = new Date().toLocaleString('en-US', {
            hour12: false,
            timeZone: 'America/Sao_Paulo'
        }).split(',');

        const message_date = date[0].trim();
        const message_time = date[1].trim();

        await sql`INSERT INTO messages 
        (id, text, user_id, chat_id, time, date) 
        VALUES (${message_id}, ${text}, ${user.id}, ${chat_id}, ${message_time}, ${message_date})`;

        await sql`UPDATE chats SET last_message = ${message_id} WHERE id = ${chat_id}`;

        return {
            success: true, data: {
                id: message_id,
                text,
                user_id: user.id,
                chat_id,
                time: message_time,
                date: new Date(message_date),
            }
        };
    } catch (e) {
        return handleActionError<MessageType>(e);
    }
}
export async function editMessage({ id, text, chat_id }: { id: string, text: string, chat_id: number }) {
    if (!(await isUserChatMember(chat_id))) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const user = await requireUser();

        await sql`
        UPDATE messages
        SET text = ${text}
        WHERE 
        id = ${id} AND 
        chat_id = ${chat_id} AND
        user_id = ${user.id}
        `;
        return { success: true };
    } catch (e) {
        return handleActionError(e);
    }

}

export async function deleteMessage({ id, chat_id }: { id: string, chat_id: number }) {
    if (!(await isUserChatMember(chat_id))) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const user = await requireUser();

        await sql`
        UPDATE chats 
        SET last_message = (
            SELECT id FROM messages
                WHERE 
                chat_id = ${chat_id} AND 
                NOT (id = ${id})
            ORDER BY date DESC, time DESC
            LIMIT 1
        )
        WHERE id = ${chat_id}
        `

        await sql`
        DELETE FROM messages 
        WHERE 
        id = ${id} AND
        chat_id = ${chat_id} AND
        user_id = ${user.id} 
        `;
        return { success: true };
    } catch (e) {
        return handleActionError(e);
    }
}