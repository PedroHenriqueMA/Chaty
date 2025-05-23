import { getMessageById } from "@/app/lib/data";
import { ChatType } from "@/app/lib/definitions";
import { User } from "@geist-ui/icons";
import Image from "next/image";
import Link from "next/link";

export default async function ChatItem({ chat }: { chat: ChatType }) {

    const name = chat.name;
    const lastMessage = await getMessageById(chat.last_message);

    const image = chat.image_url || ''

    if (name !== null) {
        return (
            <li className={`flex cursor-pointer`}>
                <Link href={`/home/chat/${chat.id}`} className="flex justify-between w-[84vw] mx-[8vw]" >
                    <div className="flex w gap-5">
                        {
                            image
                                ? (<Image src={image} alt="Imagem do grupo" width={35} height={35} className='w-[35px] h-[35px] rounded-full' />)
                                : (<User color="var(--foreground)" className='w-[35px] h-[35px] border-2 border-foreground rounded-full' />)}


                        <div className="flex flex-col">
                            <p className="font-semibold">
                                {name}
                            </p>
                            <p className="font-light text-xs ml-2">
                                {
                                    /* fazer um limite de tamanho */
                                    lastMessage == null ? '' : lastMessage.text
                                }
                            </p>
                        </div>
                    </div>
                    <p className="font-medium text-sm">
                        {
                            lastMessage == null ? '' : lastMessage.time.split(':').slice(0, 2).join(':')
                        }
                    </p>
                </Link>
            </li>
        )
    }

}