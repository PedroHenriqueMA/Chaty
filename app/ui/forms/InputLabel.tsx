export default function InputLabel(param: {
    label: string,
    placeholder: string,
    type: 'email' | 'password' | 'text' | 'confirm-password'
}) {
    return (
        <div className={`flex flex-col  justify-center gap-1 font-bold` }>
            <label htmlFor={param.type} className="ml-[8px]">
                {param.label}
            </label>

            <input
                className="rounded-3xl py-[6px] px-3 w-[200px] text-black text-sm focus:outline-none focus:ring-0"
                id={param.type}
                type={param.type}
                placeholder={param.placeholder}
                required
                autoComplete="on"
                autoFocus
            />
        </div>
    )
}