import { neon } from '@neondatabase/serverless';

export async function getUsers() {
  const sql = neon(process.env.DATABASE_URL ?? "");
  return await sql`SELECT * FROM users`;
}