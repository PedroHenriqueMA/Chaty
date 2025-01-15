import { createUser } from "@/app/lib/actions";
import InputLabel from "@/app/ui/forms/InputLabel";
import SubmitButton from "@/app/ui/forms/SubmitButton";
import Link from "next/link";
import Image from "next/image";

export default function sign() {
    return (
        <>
            <Image priority={true} width={150} height={50} src={'/logo/logo-white.png'} alt="chaty logo" />
            <form action={createUser} className="flex flex-col items-center justify-center gap-8 mt-10 ">
                <ol className="flex flex-col items-center justify-center gap-4">
                    <InputLabel type="text" placeholder="Insert your username" label="Username" name="username" />
                    <InputLabel type="email" placeholder="example@email.com" label="Email" name='email' />
                    <InputLabel type="password" placeholder="Insert your password" label="Password" name="password" />
                    <InputLabel type="password" placeholder="Repeat your password" label="Confirm Password" name="confirm-password" />
                </ol>

                <SubmitButton title="Sign up" href="/home" props="bg-wine" />

                <p> Don&apos;t have any account? <Link className="text-salmon" href="/login" >Sign in</Link></p>
            </form>
        </>
    )
}