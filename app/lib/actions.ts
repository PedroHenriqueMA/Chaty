"use server";
import { z } from 'zod';
import { neon } from '@neondatabase/serverless';
import { getUserByEmail, getUserByName } from './data';
import { State, UserType } from './definitions';
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers';

const sql = neon(process.env.DATABASE_URL ?? "");
const FormSchema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string().email({
        message: 'This is not an email'
    }),
    password: z.string()
        .min(3, {
            message: 'Requires at least 3 characters'
        })
        .max(12, {
            message: 'Requires less than 12 characters'
        })
});
const CreateUser = FormSchema.omit({ id: true });
const LoginUser = FormSchema.omit({ id: true, username: true });

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
            message: 'Fields do not match requires. Failed to Create User.',
        };
    }
    const { username, email, password } = validatedFields.data;
    const confirmPassword = formData.get("confirm-password");
    const [searchUsername, searchUserEmail] = await Promise.all([
        getUserByName(username),
        getUserByEmail(email),
    ]);
    const errors: State = {
        errors: {
            password: [],
            username: [],
            email: [],
            database: []
        },
        message: ''
    }
    if (username == '') {
        errors.errors?.username?.push("Username is required")
    }
    if (searchUsername !== undefined) {
        errors.errors?.username?.push("Username already exists");
    }
    if (searchUserEmail !== undefined) {
        errors.errors?.email?.push("Email already exists");
    }
    if (confirmPassword !== password) {
        errors.errors?.password?.push("Passwords do not match");
    }
    if (
        errors.errors?.database?.length !== 0 ||
        errors.errors?.username?.length !== 0 ||
        errors.errors?.email?.length !== 0 ||
        errors.errors?.password?.length !== 0
    ) {
        return errors
    }

    try {
        await sql(`
            INSERT INTO users (username, email, password) 
            VALUES ('${username}', '${email}', '${password})
        `); /* está sem funcionar propositalmente */
        const rawData = await sql(`
            SELECT * FROM users 
            WHERE email = '${email}'
            AND password = '${password}'
        `)

        const data: UserType[] = rawData.map((item) => ({
            id: item.id,
            username: item.username,
            email: item.email,
            password: item.password
        }))

        const cookiesStore = await cookies();
        cookiesStore.set('chaty.auth', JSON.stringify(data[0]));
        redirect('/home');

    } catch (error) {
        console.log(error)
        throw new Error('We had a problem with our database, Please wait a few minutes and try again.')
        return {
            ...state,
            errors: { database: ["Database error"] },
            message: "Failed to Create User.",
        };
    }
}


export async function loginUser(
    state: State,
    formData: FormData
): Promise<State> {
    const validatedFields = LoginUser.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }
    const { email, password } = validatedFields.data;

    const rawData = await sql(`
        SELECT * FROM users 
        WHERE email = '${email}'
        AND password = '${password}'
    `)

    const data: UserType[] = rawData.map((item) => ({
        id: item.id,
        username: item.username,
        email: item.email,
        password: item.password
    }))

    if (data[0] == undefined) {
        return {
            errors: {
                email: ['Email or password is incorrect']
            },
            message: ''
        }
    }

    const userdata = {
        id: data[0].id,
        username: data[0].username,
        email: data[0].email
    }

    const Cookies = await cookies();
    Cookies.set('chaty.auth', JSON.stringify(userdata));
    redirect('/home');
}