export type UserType = {
    id: number;
    username: string; 
    email: string;
    password: string;
}
export type UserInfoType= {
    type: 'username' | 'email'
}
export type ChatType =  {
    id: number;
    members: number[];
    last_message: number | null;
}
export type MessageType = {
    id: number;
    author: number;
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