'use client'

export default function SubmitButton(param:{
    title: string,
    href: string,
    props?: string
}){
    return (
        <input 
        className={`rounded-3xl py-2 px-8 bg-salmon-dark font-bold`}
        id="submit" 
        type="submit" 
        value={param.title}
        />
    )
}