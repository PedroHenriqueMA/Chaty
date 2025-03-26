"use server";
import { z } from 'zod';
import { createUser, getUserBy, getUserByLogin } from './data';
import { State, UserType } from './definitions';

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

export async function validateCreateUser(
    state: State,
    formData: FormData,
): Promise<State | UserType> {
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
    const [searchUsername, searchUserEmail] = await Promise.all([
        getUserBy('username', username),
        getUserBy('email', email),
    ]);
    const errors: State = {
        errors: {
            username: [],
            email: [],
            password: [],
            database: []
        },
        message: ''
    }
    if (username == '') {
        errors.errors?.username?.push("Username is required")
    }
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
        errors.errors?.database?.length !== 0 ||
        errors.errors?.username?.length !== 0 ||
        errors.errors?.email?.length !== 0 ||
        errors.errors?.password?.length !== 0
    ) {
        return errors
    }

    try {
        await createUser(
            {
                username: username,
                email: email,
                password: password
            }
        )

        const rawData = await getUserBy('email', email);

        if (rawData === null) {
            throw new Error('Faild to access your account')
        }
        const data: UserType = {
            id: rawData.id,
            username: rawData.username,
            email: rawData.email
        }

        return data

    } catch (error) {
        console.log(error)
        return {
            ...state,
            errors: { database: ["Database error"] },
            message: "Failed to Create User.",
        };
    }
}


export async function validateLoginUser(
    state: State,
    formData: FormData
): Promise<State | UserType> {
    const validatedFields = LoginUser.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to login user',
        };
    }
    const { email, password } = validatedFields.data;

    try {
        const data = await getUserByLogin(email, password)

        if (data == null) {
            return {
                errors: {
                    email: ['Email or password is incorrect']
                },
                message: ''
            }
        }
        return data

    } catch (error) {
        console.log(error)
        return {
            ...state,
            errors: { database: ["Database error"] },
            message: "Failed to Create User.",
        };
    }
}