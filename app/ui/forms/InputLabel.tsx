'use client'

import { ChatFormState, UserFormState } from "@/app/lib/definitions";

export default function InputLabel({ label, placeholder, type, name, errorName, state, props, formType }:
    {
        label: string,
        placeholder: string,
        type: 'email' | 'password' | 'text' | 'confirm-password' | 'chat_name' | 'image_url' | 'members',
        name: string,
        errorName: 'username' | 'password' | 'email' | 'chat_name' | 'image_url' | 'members',
        state: UserFormState | ChatFormState,
        props?: string,
        formType: 'user' | 'chat'
    }
) {
    let errors: string[] = [];

    if (formType === 'user') {
        const userState = state as UserFormState;
        errors = userState.errors?.[errorName as keyof UserFormState['errors']] ?? [];
    } else if (formType === 'chat') {
        const chatState = state as ChatFormState;
        errors = chatState.errors?.[errorName as keyof ChatFormState['errors']] ?? [];
    }

    return (
        <li className="flex flex-col justify-center align-center gap-1">
            <label htmlFor={name} className="ml-[8px] font-bold">
                {label}
            </label>

            <input
                className={`rounded-xl py-[6px] px-3 w-[200px] text-black text-sm focus:outline-none focus:ring-0 ${props}
                    ${errors.length > 0 ?
                        "border-red-500 border-2"
                        : ""
                    }`}
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                autoComplete="on"
                aria-describedby={`${name}-error`}
                aria-invalid={errors.length > 0}
            />

            <div id={`${name}-error aria-live="polite" aria-atomic="true"`}>
                {
                    errors && errors.map((error: string) => (
                        <p className="text-red-500 text-sm w-[200px]" key={error}>
                            {error}
                        </p>
                    ))
                }
            </div>
        </li>
    )
}