"use server";
import { z } from 'zod';
import { neon } from '@neondatabase/serverless';
import { getUsers } from './data';
import { redirect } from 'next/navigation'

const FormSchema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    password: z.string()
});

const CreateUser = FormSchema.omit({ id: true });
const LoginUser = FormSchema.omit({ id: true, username: true });

export async function createUser(formData: FormData) {
    const sql = neon(process.env.DATABASE_URL ?? "");
    const confirmPassword = formData.get("confirm-password")
    const { username, email, password } = CreateUser.parse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password")
    });

    if (confirmPassword !== password ){
        throw new Error('Please make sure your passwords match.');
    };

    const data = await getUsers();
    data.forEach((dataUser) =>{
        if(dataUser.email == email){
            throw new Error('This email is already being used.');
        }
    });

    await sql(`
        INSERT INTO users (username,email,password) 
        VALUES ('${username}','${email}','${password}')
    `);
}

export async function loginUser(formData: FormData) {
    const {email, password } = LoginUser.parse({
        email: formData.get("email"),
        password: formData.get("password")
    });

    const data = await getUsers();
    data.forEach((userData)=>{
        if (userData.email == email && userData.password == password){
            redirect('/home');
        }
    });
    
    throw new Error('Incorect email or password.');

}