import { loginUser } from "@/app/lib/actions";
import InputLabel from "@/app/ui/forms/InputLabel";
import SubmitButton from "@/app/ui/forms/SubmitButton";
import Link from "next/link";
import Image from "next/image";


export default function login() {
    return (
        <>
            <Image priority={true} width={150} height={50} src={'/logo/logo-white.png'} alt="chaty logo" />
            <form action={loginUser} className="flex flex-col items-center justify-center gap-8 mt-10 ">
                <ol className="flex flex-col items-center justify-center gap-4">
                    <InputLabel type="email" placeholder="example@email.com" label="Email" name="email" />
                    <InputLabel type="password" placeholder="Insert a password" label="Password" name="password" />
                </ol>

                <SubmitButton title="Login" href="" />

                <p> Don&apos;t have any account? <Link className="text-salmon" href="/sign-up" >Sign-up</Link></p>
            </form>
        </>
    )
}