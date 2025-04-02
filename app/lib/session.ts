"use server"
import { UserType } from './definitions';
import { jwtVerify, SignJWT } from "jose";
import { cookies } from 'next/headers'

const secret = process.env.SESSION_KEY;
const encodedKey = new TextEncoder().encode(secret);

export async function createSession({ id, username, email, image_url }: UserType) {
    const expires = new Date(Date.now() + 1000 * 60 * 60); /* 1 minuto */
    const session = await encrypt({
        user: {
            id,
            username,
            email,
            image_url
        }, expiresAt: expires
    });

    (await cookies()).set(
        'session',
        session,
        {
            httpOnly: true,
            secure: true,
            expires: expires
        });
};


type SessionPayload = {
    user: UserType,
    expiresAt: Date
};

export async function deleteSession() {
    (await cookies()).delete('session');
}

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(encodedKey);
};
export async function decrypt(session: string | undefined = ""): Promise<SessionPayload | undefined>{
    try {
        const  { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
            algorithms: ["HS256"]
        });
        return {
            user: {
                id: payload.user.id,
                username: payload.user.username,
                email: payload.user.email,
                image_url: payload.user.image_url,
            },
            expiresAt: payload.expiresAt
        };
    } catch {
        return undefined
    };
};
