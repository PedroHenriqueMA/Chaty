'use client'

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string };
    reset: () => void
}){

    return (
    <main className="flex align-center justify-center flex-col gap-8">
        <h1 className="text-center text-2xl text-salmon ">Something went wrong!</h1>
        <p className="text-center" >{error.message}</p>
        <button 
        className="rounded-3xl py-2 px-8 bg-salmon"
        onClick={
            () => reset()
        }>
            Go back
        </button>
    </main>
    )
}