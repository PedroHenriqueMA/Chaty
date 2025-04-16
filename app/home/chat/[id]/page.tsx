import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AlignJustify, User, ArrowLeft } from "@geist-ui/icons";
import { getChatById, getMessagesByChatId } from "@/app/lib/data";
import { MessageType } from "@/app/lib/definitions";
import { decrypt } from "@/app/lib/session";
import Message from "@/app/ui/home/chat/Message";
import { Suspense } from "react";

export default async function Chat({ params }: {
    params: Promise<{ id: number }>
}) {
    const { id } = await params
    const { name, image_url } = await getChatById(id) || {};
    const cookie = await decrypt((await cookies()).get('session')?.value)

    if (cookie === undefined || !id) {
        redirect('/login');
    }
    const messages: MessageType[] | null = await getMessagesByChatId(id);

    return (
        <>
            <header className="flex justify-between  px-5 py-5 border-b-2 border-yellow-50">
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
                <Suspense fallback={<> Loading ... </>}> {/* skeleton das mensagens */}
                    <ol className="flex flex-col gap-5 w-[100vw] mt-[20px]">
                        {
                            messages
                                ? messages.map((message) => (
                                    cookie.user.id === message.user_id
                                        ?
                                        <Message key={message.id} message={message} type="owner" />
                                        :
                                        <Message key={message.id} message={message} type="other" />
                                ))
                                : 'No messages found'

                        }
                    </ol>
                </Suspense>
            </main>

        </>
    )
}