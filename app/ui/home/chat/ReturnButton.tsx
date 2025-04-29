'use client'
import { ArrowLeft } from '@geist-ui/icons';
import { useRouter } from 'next/navigation';
export default function ReturnButton() {
    const router = useRouter();

    return (
        <ArrowLeft onClick={() => {
            router.back();
            setTimeout(() => {
                router.refresh()
              }, 500)
        }} className='w-[25px] h-[25px]' />
    )
}