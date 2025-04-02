'use server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from './app/lib/session';

const protectedRoutes = ["/home", "/home/chat"];
const publicRoutes = ["/", "/login", "/sign-up"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtected = protectedRoutes.includes(path);
    const isPublic = publicRoutes.includes(path);

    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    if( isProtected && !session?.user){
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    if(isPublic && session?.user){
        return NextResponse.redirect(new URL('/home', req.nextUrl));
    }

    return NextResponse.next();
}