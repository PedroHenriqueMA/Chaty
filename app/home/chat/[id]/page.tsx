import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@geist-ui/icons";
import { getChatById, getMembersByChatId, getMessagesByChatId } from "@/app/lib/data";
import { MessageType } from "@/app/lib/definitions";
import { decrypt } from "@/app/lib/session";
import { Suspense } from "react";
import ChatMessages from "@/app/ui/home/chat/ChatMessages";
import { MessageListSkeleton } from "@/app/ui/Skeletons";
import ReturnButton from "@/app/ui/home/chat/ReturnButton";
import MenuButton from "@/app/ui/home/chat/MenuButton";

export default async function Chat({ params }: {
    params: Promise<{ id: number }>
}) {
    const { id } = await params;
    const { name, image_url } = await getChatById(id) || {};
    const users = await getMembersByChatId(id);
    const cookie = await decrypt((await cookies()).get('session')?.value);

    if (cookie === undefined || !id) {
        redirect('/login');
    }
    const messages: MessageType[] | null = await getMessagesByChatId(id);

    return (
        <>
            <header className=" h-[10vh] top-0 z-[100] flex justify-between px-5 py-5 border-b-[1px] border-[var(--foreground)] bg-background">
                <div className="flex gap-4 items-center">
                    <ReturnButton/> 
                    {
                        image_url
                            ? (<Image src={image_url} alt='User avatar' width={35} height={35} className='w-[35px] h-[35px] rounded-full' />)
                            : (<User className='w-[35px] h-[35px] border-2 rounded-full' />)

                    }
                    <p className="font-semibold text-2xl hover:cursor-default">{name}</p>
                </div>
                <MenuButton/>
            </header>
            <main>
                <Suspense fallback={<MessageListSkeleton/>}> {/* skeleton das mensagens */}
                    {<ChatMessages messages={messages} currentUser={cookie.user.id} chat_id={id} users={users}/>}
                </Suspense>
            </main>

        </>
    )
}