'use client'

import { Inter } from "next/font/google";

const inter = Inter({
    weight:"700",
    subsets:["latin"]
})
export default function SubmitButton(param:{
    title: string,
    href: string,
    props?: string
}){
    return (
        <input 
        className={`rounded-3xl py-2 px-8 bg-salmon-dark ${inter.className} ${param.props}`}
        id="submit" 
        type="submit" 
        value={param.title}
        />
    )
}