import { getChatsById } from "@/app/lib/data";
import ChatItem from "./Chat";
/* import { AuthType } from "@/app/lib/definitions"; */


export default async function ChatList() {
    const userId = 3/* esse 3 deve ser o id do usuario atual */;
    const chats = await getChatsById(userId);

    return (
        <ol className="flex flex-col gap-5 mt-3">
            {
                chats ? chats.map( (chat) => ( <ChatItem key={chat.id} chat={chat} /> ) ) : ''
            }
        </ol>
    )
}