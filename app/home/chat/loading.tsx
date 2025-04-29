import { AlignJustify, ArrowLeft } from "@geist-ui/icons";

export default function Loading() {
    return (
        <div className="flex flex-col h-screen">

            <div className="flex items-center gap-4 p-4 border-b border-gray-500">
                <ArrowLeft color="gray" className=" animate-pulse "/>
                <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
                <div className="w-[200px] h-4 bg-gray-700 rounded animate-pulse"></div>
                <AlignJustify color="gray" className="w-8 h-8 rounded animate-pulse ml-auto"/>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="flex flex-col items-start space-y-2">
                    <div className="h-3 w-16 bg-gray-700 rounded animate-pulse"></div>
                    <div className="flex items-center space-x-2">
                        <div className="bg-gray-600 rounded-full px-4 py-2 animate-pulse">
                            <div className="h-3 w-20 bg-gray-700 rounded"></div>
                        </div>
                        <div className="h-3 w-10 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                </div>
                <div className="flex flex-col items-start space-y-2">
                    <div className="h-3 w-16 bg-gray-700 rounded animate-pulse"></div>
                    <div className="flex items-center space-x-2">
                        <div className="bg-gray-600 rounded-full px-4 py-2 animate-pulse">
                            <div className="h-3 w-20 bg-gray-700 rounded"></div>
                        </div>
                        <div className="h-3 w-10 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-2">
                        <div className="h-3 w-10 bg-gray-700 rounded animate-pulse"></div>
                        <div className="bg-gray-600 rounded-full px-4 py-2 animate-pulse">
                            <div className="h-3 w-24 bg-gray-700 rounded"></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start space-y-2">
                    <div className="h-3 w-16 bg-gray-700 rounded animate-pulse"></div>
                    <div className="flex items-center space-x-2">
                        <div className="bg-gray-600 rounded-full px-4 py-2 animate-pulse">
                            <div className="h-3 w-20 bg-gray-700 rounded"></div>
                        </div>
                        <div className="h-3 w-10 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-2">
                        <div className="h-3 w-10 bg-gray-700 rounded animate-pulse"></div>
                        <div className="bg-gray-600 rounded-full px-4 py-2 animate-pulse">
                            <div className="h-3 w-24 bg-gray-700 rounded"></div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="sticky bottom-0 p-4">
                <div className="flex items-center space-x-4">

                    <div className="flex justify-between items-center flex-1 h-10 bg-gray-700 rounded-full animate-pulse">
                        <div className="w-6 h-6 ml-3 bg-gray-900 rounded-full animate-pulse"></div>
                        <div className="w-6 h-6 mr-3 bg-gray-900 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

        </div>
    )
}