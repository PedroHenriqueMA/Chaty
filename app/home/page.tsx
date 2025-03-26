import { User, Search, AlignJustify } from '@geist-ui/icons';
import { Suspense } from 'react';
import { ChatListSkeleton } from '../ui/Skeletons';
import { getChatsByUserId } from '../lib/data';
import ChatItem from '../ui/home/Chat'

export default async function Home() {
    const userId = 3/* esse 3 deve ser o id do usuario atual que vai estar armazenado nos cookies*/;
    const chats = await getChatsByUserId(userId);
    console.log(chats)
    return (
        <>
            <header className='flex align-center justify-between px-5 py-5 border-b-2 border-yellow-50'>
                <User className='w-[35px] h-[35px] border-2 rounded-full' />
                <div className='flex align-center justify-center gap-4'>
                    <Search className='w-[30px] h-[30px]' />
                    <AlignJustify className='w-[30px] h-[30px]' />
                </div>
            </header>
            <main>
                <Suspense fallback={<ChatListSkeleton />}>
                    <ol className='flex flex-col gap-5 mt-3'>
                        {
                            chats ? chats.map((chat) => (<ChatItem key={chat.id} chat={chat} />)) : ''
                        }
                    </ol>
                </Suspense>

            </main>
        </>
    )
}