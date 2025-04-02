'use client'
import Link from "next/link";
import Image from "next/image";
import InputLabel from "@/app/ui/forms/InputLabel";
import SubmitButton from "@/app/ui/forms/SubmitButton";
import { useActionState, useEffect } from "react";
import { State } from "@/app/lib/definitions";
import { loginUser } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter()
    const initialState: State = { errors: {}, message: null };
    const [state, loginAction] = useActionState(loginUser, initialState);

    useEffect(() => {
        if (state.message == 'success') {
            router.push('/home');
        }
    }, [state, router]);

    return (
        <>
            <Image priority={true} width={150} height={50} src={'/logo/logo-white.png'} alt="chaty logo" />
            <form action={loginAction} className="flex flex-col items-center justify-center gap-8 mt-10 ">
                <ol className="flex flex-col items-center justify-center gap-4">
                    <InputLabel type="email" placeholder="example@email.com" label="Email" name="email" state={state} errorName="email" />
                    <InputLabel type="password" placeholder="Insert a password" label="Password" name="password" state={state} errorName="password" />
                </ol>

                <SubmitButton title="Login" href="" />

                <p> Don&apos;t have any account? <Link className="text-salmon" href="/sign-up" >Sign up</Link></p>
            </form>
        </>
    )
}