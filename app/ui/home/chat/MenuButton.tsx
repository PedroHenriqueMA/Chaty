'use client'
import { logout } from "@/app/lib/actions";
import { AlignJustify, LogOut, Settings, User, X } from "@geist-ui/icons";
import { useState } from "react";

export default function MenuButton() {
    const [showMenu, SetShowMenu] = useState(false);

    return (
        <>
            <AlignJustify onClick={() => SetShowMenu(true)} className='w-[30px] h-[30px] hover:cursor-pointer' />
            {
                showMenu && (
                    <div className="absolute right-0 flex flex-col gap-2 w-[150px] p-2 bg-salmon-dark text-white rounded-l-[20px]">
                        <div className="flex justify-between border-b-[1px] p-2 ">
                            <p className="text-lg">Menu</p>
                            <X onClick={() => SetShowMenu(false)} className="flex self-end w-[20px] hover:cursor-pointer" />
                        </div>
                        
                        <ol className="flex flex-col gap-1 mx-2 text-sm">

                            <li onClick={()=>console.log('go to profile edit')} className="flex items-center gap-2 hover:cursor-pointer">
                                <User fill="white" className="w-[15px]"/>
                                <span>Profile</span>
                            </li>
                            <li className="flex items-center gap-2 hover:cursor-pointer">
                                <Settings className="w-[15px]"/>
                                <span>Settings</span>
                            </li>
                            <li onClick={logout} className="flex items-center gap-2 mt-8 hover:cursor-pointer">
                                <LogOut className="w-[15px]" />
                                <span>Logout</span>
                            </li>
                        </ol>
                    </div>
                )
            }
        </>


    )
}