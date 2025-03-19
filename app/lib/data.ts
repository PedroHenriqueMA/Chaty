'use server';
import { neon } from '@neondatabase/serverless';
import { MessageType, UserInfoType, ChatType, UserType } from './definitions';
const sql = neon(process.env.DATABASE_URL ?? "");

const userSchema = {
  id: (value: unknown) => typeof value === 'number',
  username: (value: unknown) => typeof value === 'string',
  email: (value: unknown) => typeof value === 'string',
  password: (value: unknown) => typeof value === 'string',
};

const messageSchema = {
  id: (value: unknown) => typeof value === 'number',
  author: (value: unknown) => typeof value === 'number',
  text: (value: unknown) => typeof value === 'string',
  chat_id: (value: unknown) => typeof value === 'number',
  time: (value: unknown) => typeof value === 'string',
  date: (value: unknown) => value instanceof Date
    ? !isNaN(new Date(value).getTime()) // Verifica se pode ser convertido para uma data válida
    : false,
};

const chatShema = {
  id: (value: unknown) => typeof value === 'number',
  members: (value: unknown) => typeof value === 'object',
  last_message: (value: unknown) => typeof value === 'number' || typeof value === 'object'
}

export async function getUsers(): Promise<UserType[]> {
  const data = await sql`SELECT * FROM users`;
  const filteredData: UserType[] = data.filter(user => {
    return isOfType<UserType>(user, userSchema)
  })
  return filteredData
}
export async function getUserByEmail(email: string): Promise<UserType> {
  const data = await sql`SELECT * FROM users WHERE email = ${email}`;
  const filteredData: UserType[] = data.filter(user => {
    return isOfType<UserType>(user, userSchema)
  })
  return filteredData[0];
}

export async function getUserByName(username: string) {
  const data = await sql`SELECT * FROM users WHERE username = ${username}`;
  const filteredData: UserType[] = data.filter(user => {
    return isOfType<UserType>(user, userSchema)
  })
  return filteredData[0];
}

export async function getUserInfoById(id: number, info: UserInfoType): Promise<string | null> {
  const data = await sql`SELECT * FROM users WHERE id = ${id}`;
  if (data.length > 0 && info) {
    return data[0][info.type];
  }
  return null;
}

export async function getChatsById(userId: number): Promise<ChatType[] | null> {
  const data = await sql`SELECT * FROM chats WHERE ${userId} = ANY(members)`;
  if (data.length > 0) {
    const filteredData = data.filter(chat => {
      return isOfType<ChatType>(chat, chatShema);
    })
    return filteredData
  }
  return null
}

export async function getMessageById(messageId: number | null): Promise<MessageType | null> {
  const data = await sql`SELECT * FROM messages WHERE id = ${messageId}`
  if (data.length > 0 && isOfType<MessageType>(data[0], messageSchema)) {
    return data[0];
  }
  return null;
}

function isOfType<T>(obj: unknown, schema: { [K in keyof T]: (value: unknown) => boolean }): obj is T {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Object.keys(schema).every((key) => schema[key as keyof T]((obj as Record<string, unknown>)[key]))
  );
}