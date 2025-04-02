"use server";
import { neon } from '@neondatabase/serverless';
import { getUserBy } from './data';
import { CreateUser, LoginUser, State, UserType } from './definitions';
import { createSession, deleteSession } from './session';
import { redirect } from 'next/navigation';

const sql = neon(process.env.DATABASE_URL ?? "");

export async function createUser(
    state: State,
    formData: FormData,
): Promise<State> {
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
    const errors: State = {
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
    state: State,
    formData: FormData
): Promise<State> {
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

        return{
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

export async function logout(){
    await deleteSession();
    redirect('/login');
}