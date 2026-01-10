'use client'
import { MessageType, UserType } from "@/app/lib/definitions";
import { Delete, Edit3, User, X } from "@geist-ui/icons";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Message({ message, type, user }: { message: MessageType, type: "other" | "owner", user: UserType }) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [showHold, setShowHold] = useState(false);

    const handleDown = () => {
        timeoutRef.current = setTimeout(() => {
            setShowHold(true);
        }, 1000)
    }

    const handleUp = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }

    const obj = {
        li: {
            other: 'self-start',
            owner: 'self-end'
        },
        div: {
            other: 'rounded-tl-md self-start bg-red-700',
            owner: 'rounded-tr-md self-end bg-purple-700'
        }
    }

    return (
        <>
            <li
                onMouseDown={handleDown}
                onMouseUp={handleUp}
                onTouchStart={handleDown}
                onTouchEnd={handleUp}
                className={`flex flex-col text-white mx-[5px] relative ${obj.li[type]}`} >
                <div className={`relative flex justify-center items-center gap-2 ${type=='owner' ? 'hover:cursor-pointer' : 'hover:cursor-default'}`}>
                    {
                        type == 'owner'
                            ?
                            <div className={` flex gap-4 px-4 py-2 max-w-[300px] min-w-[100px] rounded-3xl ${obj.div[type]}`}>
                                <p className="text-sm min-w-[40%]" style={{overflowWrap: "anywhere"}}>
                                    {message.text}
                                </p>
                                <p className=" text-xs self-end flex-bottom" >
                                    {message.time.substring(0, 5)}
                                </p>
                            </div>
                            :
                            <>
                                {user.image_url
                                    ?
                                    (<Image src={user.image_url} alt={`${user.username}'s avatar`} width={25} height={25} className="w-[25px] h-[25px] rounded-3xl" />)
                                    :
                                    (<User color="var(--foreground)" className="w-[25px] h-[25px] rounded-full" />)
                                }

                                <div className="flex flex-col">
                                    <p className="ml-1 text-sm text-salmon-dark">
                                        {user.username}
                                    </p>
                                    <div className={` flex gap-4 px-4 py-2 max-w-[300px] min-w-[100px] rounded-3xl ${obj.div[type]}`}>

                                        <p className="text-sm min-w-[40%]" style={{overflowWrap: "anywhere"}}>
                                            {message.text}
                                        </p>
                                        <p className=" text-xs self-end flex-bottom" >
                                            {message.time.substring(0, 5)}
                                        </p>
                                    </div>
                                </div>
                            </>
                    }
                </div>

                {showHold && type == 'owner' && (
                    <div className="absolute top-[-70px] right-0 flex flex-col bg-wine opacity-90 w-[80px] h-[80px] rounded z-10">

                        <X onClick={() => setShowHold(false)} className="flex self-end hover:cursor-pointer w-[20px]" />
                        <div className="flex flex-col justify-center align-center">
                            {
                                <div onClick={()=> console.log('editei')} className="flex items-center gap-2 text-sm hover:cursor-pointer">
                                    <Edit3 className="w-[10px]" />
                                    <span>edit</span>
                                </div>
                            }

                            <div onClick={() => console.log('deletei')} className="flex items-center gap-2 text-sm hover:cursor-pointer">
                                <Delete className="w-[10px]" />
                                <span>delete</span>
                            </div>
                        </div>

                    </div>
                )}
            </li>

        </>
    )
}