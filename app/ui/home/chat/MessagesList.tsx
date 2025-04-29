'use client'
import { MessageType, UserType } from "@/app/lib/definitions";
import Message from "./Message";
import { useEffect, useState } from "react";
import { createMessage } from "@/app/lib/actions";
import { Paperclip, Send, Smile } from "@geist-ui/icons";

type Messagesprops = {
    messages: MessageType[] | null,
    users: UserType[],
    currentUser: string,
    chat_id: number
}

export default function MessagesList({
    messages, currentUser, chat_id, users
}: Messagesprops) {
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [allMessages, setAllMessages] = useState(messages || []);
    
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);

        const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);
        setWs(socket);

        socket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            if (newMessage.chat_id == chat_id) {
                setAllMessages((prev) => [...prev, newMessage]);
            }
        };

        return () => {
            socket.close();
        };
    }, [chat_id]);

    const sendMessage = async () => {
        if (ws?.readyState === WebSocket.OPEN && message !== '') {
            const date = new Date().toLocaleString('en-US', {
                hour12: false,
                timeZone: 'America/Sao_Paulo'
            }).split(',');

            const messageDate = date[0].trim();
            const messageTime = date[1].trim();

            const messageObj = {
                id: crypto.randomUUID(),
                user_id: currentUser,
                text: message,
                chat_id: chat_id,
                time: messageTime,
                date: messageDate
            }
            await createMessage(messageObj);
            ws.send(JSON.stringify(messageObj));
            window.scrollTo(0, document.body.scrollHeight);
            setMessage('');
        }
    };

    return (
        <>
            <ol className="flex flex-col gap-4 min-h-[80vh] mt-[20px]">
                {
                    allMessages
                        ? allMessages.map((message) => {
                            const messageAuthor = users.find((user) => user.id === message.user_id);
                            if (messageAuthor) {
                                if (currentUser === message.user_id) {
                                    return <Message key={message.id} message={message} type="owner" user={messageAuthor} />
                                }
                                return <Message key={message.id} message={message} type="other" user={messageAuthor} />
                            }
                            return
                        })
                        : 'No messages found'
                }
            </ol>
            <div className="sticky bottom-[0] left-[calc(50vw-40vw-22.5px)] flex items-center justify-center space-x-[5px] pb-4 pt-2 mt-2 bg-[linear-gradient(rgba(var(--background-rgb),0),rgba(var(--background-rgb),0.8))] backdrop-blur-[1px]">

                <div className="flex items-center z-10 bg-wine text-white w-[80vw] rounded-full px-4 py-2">

                    <button className="mr-3 pr-2 border-r-[1px]">
                        <Smile className="w-[20px] h-[20px]" />
                    </button>


                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key == 'Enter' ? sendMessage() : ''}
                        placeholder="message"
                        className="bg-transparent outline-none placeholder-white text-sm w-[100%] flex-wrap"
                    />


                    <button className="ml-3">
                        <Paperclip className="[20px] h-[20px] rotate-[135deg]" />
                    </button>
                </div>


                <button className="bg-wine p-[10px] z-10 rounded-full" onClick={sendMessage}>
                    <Send className="w-[20px] h-[20px] rotate-[15deg]" />
                </button>
            </div>
        </>
    )
}