'use client'
import { createChat } from "@/app/lib/actions";
import { userExist } from "@/app/lib/data";
import { ChatFormState } from "@/app/lib/definitions";
import { Plus, Search, X } from "@geist-ui/icons";
import { useActionState, useEffect, useState } from "react";
import InputLabel from "../forms/InputLabel";


export default function CreateChat() {
    const initialState: ChatFormState = { errors: {}, message: '' };
    const [isOpen, setIsOpen] = useState(false);
    const [state, CreateChat] = useActionState(createChat, initialState);
    const [membersInput, SetMembersInput] = useState('');
    const [members, setMembers] = useState<string[]>([]);


    useEffect(() => {
        if (state.message == 'success') {
            setIsOpen(false);
        }
    }, [state]);

    const membersError = state.errors?.members || [];

    const addMember = async () => {
        if (membersInput.trim() !== '' && !members.includes(membersInput.trim()) && await userExist(membersInput.trim())) {
            setMembers([...members, membersInput.trim()]);
            SetMembersInput('');
        }
    }

    const removeMember = (member: string) => {
        setMembers(members.filter(m => m !== member));
    }

    return (
        <>
            <div className="fixed bottom-[10px] right-[10px]">
                <button onClick={() => setIsOpen(true)} className=' w-[60px] h-[60px] text-4xl flex items-center justify-center rounded-[20px] bg-wine text-white'>
                    +
                </button>
            </div>


            {isOpen ? (
                <>
                    <div className="fixed z-2 top-0 left-0 w-[100vw] h-[100vh] bg-black opacity-75">

                    </div>
                    <form action={CreateChat}
                        className={`flex flex-col justify-center items-center gap-6 fixed z-10 w-[80vw] max-w-[400px] h-[70vh] max-h-[500px] ${window.innerWidth * .2 > window.innerWidth - 400 ? 'left-[10vw]' : 'left-[calc(50vw-200px)]'} top-[15vh] bg-background rounded-3xl`}>
                        <X onClick={() => setIsOpen(false)} className="absolute top-[15px] right-[15px] w-[30px] h-[30px] cursor-pointer" />

                        <ol className="flex flex-col gap-5 items-center justify-center">
                            <InputLabel type="text" placeholder='Name' label="Chat name" name="chat_name" errorName="chat_name" state={state} formType="chat" />
                            <InputLabel type="text" placeholder='https://example.com' label="Image URL" name="image_url" errorName="image_url" state={state} formType="chat" />
                            <li className="flex flex-col gap-2">
                                <label
                                    htmlFor="search_members"
                                    className="pl-2 font-bold"
                                >
                                    Members
                                </label>

                                <div className="flex flex-row gap-2 max-w-[200px] max-h-[100px] flex-wrap flex-hide overflow-y-scroll scrollbar">
                                    {
                                        members.map((member, index) => (
                                            <span key={index} className="flex items-center bg-wine text-white/90 px-3 py-1 rounded-full text-xs">
                                                {member.trim()}
                                                <button className="ml-2 text-white houver:text-red-500"
                                                    onClick={() => { removeMember(member.trim()) }}
                                                >
                                                    &times;
                                                </button>
                                            </span>
                                        ))
                                    }
                                </div>

                                <div className="flex gap-2 relative">
                                    <Search color="black" className="absolute w-[15px] top-[6px] left-[6px] opacity-40" />
                                    <input
                                        type="text"
                                        value={membersInput}
                                        onChange={(e) => { SetMembersInput(e.target.value) }}
                                        placeholder="Username"
                                        className={`pl-6 pr-2 py-2 rounded-xl min-w-[100px] text-xs text-black focus:outline-none focus:ring-0 border-[2px]
                                            ${membersError.length > 0 ?
                                                "border-red-500 border-2"
                                                : ""
                                            }
                                            `}
                                        autoComplete="on"
                                        aria-describedby="members-error"
                                    />
                                    <button type="button" onClick={addMember} className="absolute left-[200px] bg-wine rounded-xl p-2 text-xs text-white" ><Plus className="w-[20px] h-[20px] p-[1px]" /></button>
                                </div>
                                {
                                    membersError ?
                                        <p className="text-red-500 text-sm w-[200px]">
                                            {membersError}
                                        </p> : ''
                                }
                                <input
                                    name="members"
                                    className="h-[20px]"
                                    type="text"
                                    hidden
                                    value={members.join(',')}
                                    readOnly
                                />
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