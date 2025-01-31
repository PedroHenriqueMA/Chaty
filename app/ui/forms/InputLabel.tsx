'use client'
export default function InputLabel(param: {
    label: string,
    placeholder: string,
    type: 'email' | 'password' | 'text' | 'confirm-password',
    name: string
}) {
    return (
        <li className="flex flex-col  justify-center gap-1">
            <label htmlFor={param.type} className="ml-[8px] font-bold">
                {param.label}
            </label>

            <input
                className="rounded-3xl py-[6px] px-3 w-[200px] text-black text-sm focus:outline-none focus:ring-0"
                id={param.name}
                type={param.type}
                name={param.name}
                placeholder={param.placeholder}
                required
                autoComplete="on"
                autoFocus
            />
        </li>
    )
}