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
export type ChatType =  {
    id: number;
    name: string;
    image_url: string | null;
    last_message: number | null;
}
export type MessageType = {
    id: number;
    user_id: string;
    text: string;
    chat_id: number;
    time: string; /* Mudar para um tipo mais correto */
    date: Date
}
export type State = {
    errors?: {
        username?: string[],
        email?: string[],
        password?: string[],
        database?: string[],
    };
    message?: string | null;
}