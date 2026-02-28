import { MessageType } from "@/app/lib/definitions"

export default function MessageSplitter({ date }: { date: MessageType["date"] }) {
    const day = date.getDay().toString();
    const mounth = (date.getMonth()+1).toString();
    const year = date.getFullYear().toString();
    return (
        <div className=" flex justify-center items-center w-full h-[1px] py-[15px] border-t-[1px] border-gray-500">
            <p className="text-center align-center text-gray-500 text-[14px]">
                {day.length == 1 ? "0" + day: day}/{mounth.length == 1 ? "0" + mounth: mounth}/{year} 
            </p>
        </div>
    )
}