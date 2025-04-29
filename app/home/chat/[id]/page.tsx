import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AlignJustify, User, ArrowLeft } from "@geist-ui/icons";
import { getChatById, getMembersByChatId, getMessagesByChatId } from "@/app/lib/data";
import { MessageType } from "@/app/lib/definitions";
import { decrypt } from "@/app/lib/session";
import { Suspense } from "react";
import MessagesList from "@/app/ui/home/chat/MessagesList";
import { MessageListSkeleton } from "@/app/ui/Skeletons";

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
            <header className="flex justify-between px-5 py-5 border-b-2 border-yellow-50">
                <div className="flex gap-2 items-center">
                    <ArrowLeft /> {/* retornar para página anterior */}
                    {
                        image_url
                            ? (<Image src={image_url} alt='User avatar' width={35} height={35} className='w-[35px] h-[35px] rounded-full' />)
                            : (<User className='w-[35px] h-[35px] border-2 rounded-full' />)

                    }
                    <p className="font-semibold text-2xl">{name}</p>
                </div>
                <AlignJustify className='w-[30px] h-[30px]' />
            </header>
            <main>
                <Suspense fallback={<MessageListSkeleton/>}> {/* skeleton das mensagens */}
                    {<MessagesList messages={messages} currentUser={cookie.user.id} chat_id={id} users={users}/>}
                </Suspense>
            </main>

        </>
    )
}