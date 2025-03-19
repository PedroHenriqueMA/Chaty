import { User, Search, AlignJustify } from '@geist-ui/icons';
import ChatList from '../ui/home/ChatList';
import { Suspense } from 'react';
import { ChatListSkeleton } from '../ui/Skeletons';

export default async function Home() {

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
                <Suspense fallback={<ChatListSkeleton/>}>
                    <ChatList/>
                </Suspense>
                
            </main>
        </>
    )
}