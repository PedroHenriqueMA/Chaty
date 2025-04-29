import { AlignJustify, Search, User } from "@geist-ui/icons";

export default function Loading() {
    return (
        <div className="w-full h-screen overflow-y-auto">

            <div className="flex items-center justify-between mb-6 p-4">
                <User className="h-10 w-10 rounded-full animate-pulse"/>
                <div className="flex gap-2">
                    <Search color="gray" className="h-[30px] w-[30px] rounded-md animate-pulse" />
                    <AlignJustify color="gray" className="h-[30px] w-[30px] rounded-md animate-pulse" />
                </div>

            </div>

            <div className="space-y-6 flex flex-col mt-3 justify-between w-[84vw] mx-[8vw]">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-center justify-between space-x-4 ">
                        <User className="h-8 w-8 border-2 rounded-full animate-pulse"/>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="h-3 w-6 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                ))}
            </div>

            <div className="fixed bottom-[10px] right-[10px]">
                <div className="w-[60px] h-[60px] bg-wine text-white text-4xl flex items-center justify-center rounded-[20px] animate-pulse">
                    +
                </div>
            </div>
        </div>
    )
}