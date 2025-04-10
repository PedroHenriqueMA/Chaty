import Image from 'next/image';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { User, Search, AlignJustify } from '@geist-ui/icons';
import { ChatListSkeleton } from '../ui/Skeletons';
import ChatItem from '../ui/home/Chat';
import { logout } from '../lib/actions';
import { decrypt } from '../lib/session';
import { getChatsByUserId } from '../lib/data';
import CreateChat from '../ui/home/CreateChat';

export default async function Home() {
    const cookie  = await decrypt((await cookies()).get('session')?.value);
    if(cookie === undefined){
        redirect('/login');
    }
    const chats = await getChatsByUserId(cookie.user.id);
    const user_image = cookie.user.image_url

    return (
        <>
            <header className='flex align-center justify-between px-5 py-5 border-b-2 border-yellow-50'>
                {
                    user_image
                    ? (<Image src={user_image} alt='User avatar' width={35} height={35} className='w-[35px] h-[35px] rounded-full' />)
                    : (<User className='w-[35px] h-[35px] border-2 rounded-full' />)

                }
            
                <div className='flex align-center justify-center gap-4'>
                    <Search className='w-[30px] h-[30px]' />
                    <AlignJustify className='w-[30px] h-[30px]' />
                </div>
            </header>
            <main>

                <button onClick={logout}>
                    Logout
                </button>

                <Suspense fallback={<ChatListSkeleton />}>
                    <ol className='flex flex-col gap-5 mt-3'>
                        {
                            chats ? chats.map((chat) => (<ChatItem key={chat.id} chat={chat} />)) : ''
                        }
                    </ol>
                </Suspense>
                <CreateChat/>
            </main>   
        </>
    )
}