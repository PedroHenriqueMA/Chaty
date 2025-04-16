'use server';
import { neon } from '@neondatabase/serverless';
import { MessageType, UserType, ChatType } from './definitions';
const sql = neon(process.env.DATABASE_URL ?? "");

export async function getUsers() {
  return await sql`SELECT * FROM users`;
}

export async function getUserBy(key: string, value: string): Promise<UserType | null> {
  const validKeys = ["id", "username", "email"];
  if (!validKeys.includes(key)) {
    throw new Error("Invalid key");
  }

  const query = `SELECT * FROM users WHERE ${key} = $1`;
  const data = await sql(query, [value]);

  if (!data[0] || data.length === 0) return null;

  return {
    id: data[0].id,
    username: data[0].username,
    email: data[0].email,
    image_url: data[0].image_url
  };
}
export async function getChatsAllowedForUser(userId: string): Promise<ChatType['id'][]> {
  const data = await sql`SELECT * FROM chat_members WHERE user_id = ${userId}`
  return data.map((chat_member) => {
    return chat_member.chat_id
  })
}
export async function getChatsByUserId(userId: string): Promise<ChatType[] | null> {
  const chatMembers = await sql`SELECT * FROM chat_members WHERE user_id = ${userId}`;

  if (!chatMembers || chatMembers.length === 0) {
    return null;
  }

  const idChats = (chatMembers.map((chatMember) => chatMember.chat_id)).filter(Number.isInteger);
  const chats = await sql(`SELECT * FROM chats WHERE id IN (${idChats.join(',')})`);

  const validChats: ChatType[] = chats.filter((chat): chat is ChatType =>
    typeof chat.id === 'number' &&
    (chat.last_message === null || typeof chat.last_message === 'number')
  );

  return validChats.length > 0 ? validChats : null;
}

export async function getChatById(chatId: number): Promise<ChatType | null>{
  const data = await sql`SELECT * FROM chats WHERE id = ${chatId}`

  if(data.length === 0) {
    return null
  }
  return {
    id: data[0].id,
    name: data[0].name,
    last_message: data[0].last_message,
    image_url: data[0].image_url
  }
}

export async function getMembersByChatId(chatId: number) {
  const data = await sql`SELECT * FROM chat_members WHERE chat_id = ${chatId}`;
  return data /* Retorna sem tipo nenhum */
}

export async function getMessageById(messageId: number | null): Promise<MessageType | null> {
  if (messageId === null) return null;

  const data = await sql`
    SELECT * FROM messages WHERE id = ${messageId}
  `;

  if (!data || data.length === 0) return null;

  const message = data[0];

  return {
    id: message.id,
    user_id: message.user_id,
    text: message.text,
    chat_id: message.chat_id,
    time: message.time,
    date: new Date(message.date),
  };
}

export async function getMessagesByUserId(userId: number) {
  return await sql`SELECT * FROM messages WHERE user_id = ${userId}`
}

export async function getMessagesByChatId(chatId: number): Promise<MessageType[] | null> {
  const data = await sql`SELECT * FROM messages WHERE chat_id = ${chatId}`;

  if (!data || data.length === 0) {
    return null
  }

  return data.map((item): MessageType => {
    return {
      id: item.id,
      chat_id: item.chat_id,
      user_id: item.user_id,
      text: item.text,
      time: item.time,
      date: item.date
    }
  })
}

export async function userExist(userName: string): Promise<boolean> {
  const data = await sql`SELECT * FROM users WHERE username = ${userName}`;
  if (data.length == 0) {
    return false;
  }
  return true;
}

export async function chatExist(chatName: string): Promise<boolean> {
  const data = await sql`SELECT * FROM chats WHERE name = ${chatName}`;
  if (data.length == 0) {
    return false;
  }
  return true;
}