'use client'
import Link from "next/link";
import Image from "next/image";
import InputLabel from "@/app/ui/forms/InputLabel";
import SubmitButton from "@/app/ui/forms/SubmitButton";
import { useActionState, useEffect } from "react";
import { State } from "@/app/lib/definitions";
import { createUser } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function Sign() {
    const router = useRouter()
    const initialState: State = { errors: {}, message: null };
    const [state, createAction] = useActionState(createUser, initialState);

    useEffect(() => {
        if (state.message == 'success') {
            router.push('/home');
        }
    }, [state, router]);

    return (
        <>
            <Image priority={true} width={150} height={50} src={'/logo/logo-white.png'} alt="chaty logo" />
            <form action={createAction} className="flex flex-col items-center justify-center gap-8 mt-10 ">
                <ol className="flex flex-col items-center justify-center gap-4">
                    <InputLabel type="text" placeholder="Insert your username" label="Username" name="username" errorName="username" state={state} />
                    <InputLabel type="text" placeholder="example@email.com" label="Email" name='email' errorName='email' state={state} />
                    <InputLabel type="password" placeholder="Insert your password" label="Password" name="password" errorName="password" state={state} />
                    <InputLabel type="password" placeholder="Repeat your password" label="Confirm Password" name="confirm-password" errorName='password' state={state} />
                </ol>

                <SubmitButton title="Sign up" href="/home" props="bg-wine" />

                <p> Don&apos;t have any account? <Link className="text-salmon" href="/login" >Sign in</Link></p>
            </form>
        </>
    )
}