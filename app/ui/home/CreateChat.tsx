'use client'
import { createChat } from "@/app/lib/actions";
import { userExist } from "@/app/lib/data";
import { ChatFormState } from "@/app/lib/definitions";
import { Plus, Search, X } from "@geist-ui/icons";
import { useActionState, useEffect, useState } from "react";


export default function CreateChat() {
    const initialState: ChatFormState = { errors: {}, message: '' };
    const [isOpen, setIsOpen] = useState(false);
    const [state, CreateChat] = useActionState(createChat, initialState);

    useEffect(() => {
        if (state.message == 'success') {
            setIsOpen(false);
        }
        /* colocar os erros nos campos */

    }, [state])


    return (
        <>
            <button onClick={() => setIsOpen(true)} className='fixed bottom-[10px] right-[10px] w-[60px] h-[60px] p-[10px] rounded-[20px] bg-wine text-white'>
                <Plus className='w-[40px] h-[40px]' />
            </button>
            {isOpen ? (
                <>
                    <div className="fixed z-2 top-0 left-0 w-[100vw] h-[100vh] bg-black opacity-75">

                    </div>
                    <form action={CreateChat}
                        className={`flex flex-col justify-center items-center gap-6 fixed z-10 w-[80vw] max-w-[400px] h-[70vh] max-h-[500px] ${window.innerWidth * .2 > window.innerWidth - 400 ? 'left-[10vw]' : 'left-[calc(50vw-200px)]'} top-[15vh] bg-background rounded-3xl`}>
                        <X onClick={() => setIsOpen(false)} className="absolute top-[10px] right-[10px] w-[30px] h-[30px] cursor-pointer" />

                        <ol className="flex flex-col gap-5 items-center justify-center">
                            <li className="flex flex-col gap-2">
                                <label
                                    htmlFor="name"
                                    className="pl-6 text-sm font-semibold"
                                >
                                    Chat name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="px-2 py-2 rounded-3xl text-xs text-black focus:outline-none focus:ring-0 border-2"
                                />
                            </li>
                            <li className="flex flex-col">
                                <label
                                    htmlFor="url"
                                    className="pl-6 text-sm font-semibold"
                                >
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    name="url"
                                    id="url"
                                    placeholder="https://example.com"
                                    className="px-2 py-2 rounded-3xl text-xs text-black focus:outline-none focus:ring-0 border-2"
                                />
                            </li>
                            <li className="relative flex flex-col">
                                <label
                                    htmlFor="search_members"
                                    className="pl-6 text-sm font-semibold"
                                >
                                    Members
                                </label>

                                <div className="flex gap-2">
                                    <Search color="black" className="absolute w-[15px] top-[23px] left-[6px] opacity-40" />
                                    <input
                                        type="text"
                                        name="search_members"
                                        id="search_members"
                                        placeholder="Username"
                                        className="pl-6 pr-2 py-2 rounded-3xl min-w-[100px] text-xs text-black focus:outline-none focus:ring-0 border-[2px] "
                                    />
                                    <button type="button" onClick={async () => {
                                        const member = (document.getElementById('search_members') as HTMLInputElement);
                                        if (await userExist(member.value)) {
                                            const inputMember = document.querySelector('#members') as HTMLInputElement;
                                            inputMember.value += `${member.value},`;

                                            const li = document.createElement('li');
                                            li.innerHTML = member.value;
                                            li.classList = 'text-xs';
                                            document.querySelector('#members-box')?.appendChild(li);

                                            member.classList.remove('border-red-500');
                                            member.classList += ' border-green-500';
                                        } else {
                                            member.classList.remove('border-green-500')
                                            member.classList += ' border-red-500'
                                        }

                                    }} className="absolute left-[200px] bg-wine rounded-xl p-2 text-xs text-white" ><Plus className="w-[20px] h-[20px] p-[1px]" /></button>
                                </div>
                                <input className="h-[20px]" type="text"
                                    name="members" id="members" hidden />
                                <ol id='members-box' className=" flex flex-row gap-2 max-w-[150px] flex-wrap"></ol>

                            </li>
                        </ol>

                        <button
                            type="submit"
                            className="bg-wine font-bold rounded-3xl px-8 py-3 text-white"
                        >
                            Create
                        </button>
                    </form>
                </>
            ) : ""
            }
        </>
    )
}