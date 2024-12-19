import InputLabel from "@/app/ui/forms/InputLabel";
import SubmitButton from "@/app/ui/forms/SubmitButton";
import Link from "next/link";

export default function sign() {
    return (
        <form action='signUpForm' method="post" className="flex flex-col items-center justify-center gap-8 mt-10 ">
            <div className="flex flex-col items-center justify-center gap-4">
                <InputLabel type="text" placeholder="Insert your username" label="Username" />
                <InputLabel type="email" placeholder="example@email.com" label="Email" />
                <InputLabel type="password" placeholder="Insert your password" label="Password" />
                <InputLabel type="confirm-password" placeholder="Repeat your password" label="Confirm Password" />
            </div>

            <SubmitButton title="Sign up" href="/home" props="bg-wine"/>

            <p> Don't have any account? <Link className="text-salmon" href="/login" >Sign in</Link></p>
        </form>
    )
}