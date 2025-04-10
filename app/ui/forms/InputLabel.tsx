'use client'

import { UserFormState } from "@/app/lib/definitions"

export default function InputLabel({ label, placeholder, type, name, errorName, state, props }:
    {
        label: string,
        placeholder: string,
        type: 'email' | 'password' | 'text' | 'confirm-password',
        name: string,
        errorName: 'username' | 'password' | 'email',
        state: UserFormState,
        props?: string
    }
) {

    const errors = state.errors?.[errorName] || [];
    return (
        <li className="flex flex-col justify-center align-center gap-1">
            <label htmlFor={name} className="ml-[8px] font-bold">
                {label}
            </label>

            <input
                className={`rounded-3xl py-[6px] px-3 w-[200px] text-black text-sm focus:outline-none focus:ring-0 ${props}
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