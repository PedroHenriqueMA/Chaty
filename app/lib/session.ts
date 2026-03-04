"use server"
import { UserType } from './definitions';
import { jwtVerify, SignJWT } from "jose";
import { cookies } from 'next/headers'
import { UnauthorizedError } from './errors';

type SessionPayload = {
    user: UserType,
    expiresAt: Date
};

const secret = process.env.SESSION_KEY;
const encodedKey = new TextEncoder().encode(secret);

export async function createSession({ id, username, email, image_url }: UserType) {
    const expires = new Date(Date.now() + 1000 * 60 * 60);
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

export async function getOptionalSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function requireSession(): Promise<SessionPayload> {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;

    if (!session) {
        throw new UnauthorizedError();
    }

    const decrypted = await decrypt(session);

    if (!decrypted) {
        throw new UnauthorizedError();
    }

    return decrypted;
}

export async function requireUser() {
    const session = await requireSession();

    if (!session.user) {
        throw new UnauthorizedError();
    }

    return session.user;
}

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

export async function decrypt(session: string | undefined = ""): Promise<SessionPayload | null>{
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
        return null
    };
};
