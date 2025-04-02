import { getUserBy } from "@/app/lib/data";
import { MessageType } from "@/app/lib/definitions";
import { User } from "@geist-ui/icons";
import Image from "next/image";

export default async function Message({ message, type }: { message: MessageType, type: "other" | "owner" }) {
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

    const { image_url, username } = await getUserBy('id', message.user_id);


    return (
        <li className={`flex justify-center items-center gap-2 text-white mx-[10px] relative ${obj.li[type]}`} >
            {
                type == 'owner'
                    ? ''
                    :
                    image_url
                        ?
                        <Image src={image_url} alt={`${username}'s avatar`} width={25} height={25} className="w-[25px] h-[25px] rounded-3xl" />
                        :
                        <User className="w-[25px] h-[25px] rounded-3xl" />
            }
            <div className={` flex gap-4 px-4 py-2 max-w-[300px] min-w-[100px] rounded-3xl ${obj.div[type]}`}>
                <p className="text-sm wrap min-w-[40%]" >
                    {message.text}
                </p>
                <p className=" text-xs self-end flex-bottom" >
                    {message.time.substring(0, 5)}
                </p>
            </div>

        </li>
    )
}