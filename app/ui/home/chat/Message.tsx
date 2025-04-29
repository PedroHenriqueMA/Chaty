import { MessageType, UserType } from "@/app/lib/definitions";
import { User } from "@geist-ui/icons";
import Image from "next/image";

export default function Message({ message, type, user }: { message: MessageType, type: "other" | "owner", user: UserType }) {
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
        <li className={`flex justify-center items-center gap-2 text-white mx-[5px] relative ${obj.li[type]}`} >
            {
                type == 'owner'
                    ?
                    <div className={` flex gap-4 px-4 py-2 max-w-[300px] min-w-[100px] rounded-3xl ${obj.div[type]}`}>
                        <p className="text-sm wrap min-w-[40%]" >
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

                                <p className="text-sm wrap min-w-[40%]" >
                                    {message.text}
                                </p>
                                <p className=" text-xs self-end flex-bottom" >
                                    {message.time.substring(0, 5)}
                                </p>
                            </div>
                        </div>
                    </>
            }

        </li>
    )
}