import { User } from "@geist-ui/icons"

export function ChatListSkeleton() {
    return (
        <div>
            <div className="space-y-6 flex flex-col mt-3 justify-between w-[84vw] mx-[8vw]">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-center justify-between space-x-4 ">
                        <User className="h-8 w-8 border-2 rounded-full animate-pulse" />
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
export function MessageListSkeleton() {
    return (
        <div className="flex flex-col h-screen bg-[#2e1217]">

            <div className="flex items-center gap-4 p-4 border-b border-gray-500">
                <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
                <div className="flex-1 h-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-700 rounded animate-pulse ml-auto"></div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="flex flex-col items-start space-y-2">
                    <div className="h-3 w-16 bg-gray-700 rounded animate-pulse"></div>
                    <div className="flex items-center space-x-2">
                        <div className="bg-red-600 rounded-full px-4 py-2 animate-pulse">
                            <div className="h-3 w-20 bg-gray-700 rounded"></div>
                        </div>
                        <div className="h-3 w-10 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-2">
                        <div className="h-3 w-10 bg-gray-700 rounded animate-pulse"></div>
                        <div className="bg-purple-600 rounded-full px-4 py-2 animate-pulse">
                            <div className="h-3 w-24 bg-gray-700 rounded"></div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="sticky bottom-0 bg-[#6e2b3a] p-4">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="flex-1 h-10 bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
                        <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

        </div>
    )
}