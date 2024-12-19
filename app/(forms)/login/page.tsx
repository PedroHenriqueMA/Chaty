import InputLabel from "@/app/ui/forms/InputLabel";
import SubmitButton from "@/app/ui/forms/SubmitButton";
import Link from "next/link";


export default function login() {
    return (
        <form action='loginForm' method="get" className="flex flex-col items-center justify-center gap-8 mt-10 ">
            <div className="flex flex-col items-center justify-center gap-4">
                <InputLabel type="email" placeholder="example@email.com" label="Email" />
                <InputLabel type="password" placeholder="Insert a password" label="Password" />
            </div>

            <SubmitButton title="Login" href="/home" />

            <p> Don't have any account? <Link className="text-salmon" href="/sign-up" >Sign-up</Link></p>
        </form>
    )
}