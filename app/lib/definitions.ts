import { z } from 'zod';

const FormSchema = z.object({
    id: z.string(),
    username: z.string().nonempty({
        message: 'Username is required'
    }),
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
export const chatSchema = z.object({
    chat_name: z.string().nonempty({
        message: 'Chat name is required'
    }),
    image_url: z.string(),
    members: z.string().array().nonempty({
        message: 'Chat members are required'
    })
})
export const CreateUser = FormSchema.omit({ id: true });
export const LoginUser = FormSchema.omit({ id: true, username: true });

export type ChatMembersType = {
    user_id: UserType['id'];
    chat_id: ChatType['id'];
}
export type UserType = {
    id: string;
    username: string;
    email: string;
    image_url: string | null;
}
export type ChatType = {
    id: number;
    name: string;
    image_url: string | null;
    last_message: MessageType['id'] | null;
}
export type MessageType = {
    id: string;
    user_id: UserType['id'];
    text: string;
    chat_id: ChatType['id'];
    time: string; /* Mudar para um tipo mais correto */
    date: string
}
export type UserFormState = {
    errors?: {
        username?: string[],
        email?: string[],
        password?: string[],
        database?: string[],
    };
    message?: string | null;
}
export type ChatFormState = {
    errors?: {
        name?: string[],
        image_url?: string[],
        members?: string[],
        database?: string[]
    };
    message?: string | null
}