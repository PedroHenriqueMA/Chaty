export type ChatMembersType = {
    user_id: UserType['id'];
    chat_id: ChatType['id'];
}
export type UserType = {
    id: number;
    username: string; 
    email: string;
}
export type ChatType =  {
    id: number;
    last_message: number | null;
}
export type MessageType = {
    id: number;
    user_id: number;
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