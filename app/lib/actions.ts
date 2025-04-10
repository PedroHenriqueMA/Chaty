"use server";
import { neon } from '@neondatabase/serverless';
import { chatExist, getUserBy } from './data';
import { ChatFormState, chatSchema, CreateUser, LoginUser, UserFormState, UserType } from './definitions';
import { createSession, decrypt, deleteSession } from './session';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

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

        await sql(`
            INSERT INTO users (username, email, password) 
            VALUES ('${username}', '${email}', '${password}')
        `);

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
        return {
            ...state,
            errors: { database: [`Database error: ${error}`] },
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
        const data = await sql`SELECT * FROM users WHERE email = ${email} AND password = ${password} `;

        if (!data || data.length === 0) {
            return {
                errors: {
                    email: ['Email or password is incorrect']
                },
                message: 'Login is incorrect'
            }
        };

        await createSession({
            id: data[0].id,
            username: data[0].username,
            email: data[0].email,
            image_url: data[0].image_url
        });

        return {
            errors: {},
            message: 'success'
        }

    } catch (error) {
        return {
            ...state,
            errors: { database: [`Database error: ${error}`] },
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
        name: formData.get("name"),
        image_url: formData.get("url"),
        members: formData.get("members")?.toString().split(',').filter(val => val !== '')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to login user',
        };
    };

    const { name, image_url, members } = validatedFields.data;
    const isNameUsed = await chatExist(name);

    if (isNameUsed) {
        return {
            errors: {
                name: ['This name is already being used'],
            },
            message: 'faild to create chat'
        };
    };


    console.log(name, image_url, members);

    try {
        const userLogged = await decrypt((await cookies()).get('session')?.value).then((res) => res?.user);

        if (!userLogged) {
            revalidatePath('/home');
            return {
                errors: {},
                message: 'There is no user logged'
            }
        };

        await sql`INSERT INTO chats (name, image_url) 
            VALUES (${name}, ${image_url})`;

        const chatId = (await sql`SELECT * FROM chats WHERE name = ${name}`)[0].id;

        if (!members.includes(userLogged?.username)) {
            await sql`INSERT INTO chat_members (user_id, chat_id) VALUES (${userLogged?.id}, ${chatId})`;
        };

        /* os membros podem ser repetidos */
        members.forEach(async (memberName) => {
            const { id } = await getUserBy('username', memberName);
            await sql`INSERT INTO chat_members (user_id, chat_id) VALUES (${id}, ${chatId})`;
        });

        revalidatePath('/home');
        return {
            errors: {},
            message: 'success'
        };
    } catch (error) {
        console.log(error);
        return {
            errors: { database: ['faild to create chat'] },
            message: `${error}`
        };
    };
};