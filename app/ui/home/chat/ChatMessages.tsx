'use client'
import { MessageType, UserType } from "@/app/lib/definitions";
import Message from "./Message";
import { useEffect, useState, Fragment, useRef } from "react";
import { createMessage } from "@/app/lib/actions";
import { ArrowDownCircle, Paperclip, Send, Smile } from "@geist-ui/icons";
import MessageSplitter from "./MessageSplitter";

type MessagesProps = {
    messages: MessageType[] | null,
    users: UserType[],
    currentUser: string,
    chat_id: number
}

export default function ChatMessages({
    messages, currentUser, chat_id, users
}: MessagesProps) {
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [allMessages, setAllMessages] = useState(messages || []);
    const [showDownButton, setShowDownButton] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);
    const messagesRef = useRef<HTMLOListElement>(null);

    useEffect(() => {
        const el = messagesRef.current;
        if (!el) return;

        const onScroll = () => {
            const distance =
                el.scrollHeight - el.scrollTop - el.clientHeight;
            setShowDownButton(distance > 50);
        };

        el.addEventListener("scroll", onScroll);
        return () => el.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);
        setWs(socket);

        socket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            if (newMessage.chat_id == chat_id) {
                setAllMessages((prev) => [...prev, { 
                    id: newMessage.id,
                    user_id: newMessage.user_id, 
                    chat_id: newMessage.chat_id,
                    text: newMessage.text,
                    time: newMessage.time,
                    date: new Date(newMessage.date)
                 }]);
            }
        };

        return () => {
            socket.close();
            console.log("desconcetou");
        };
    }, [chat_id]);

    useEffect(() => {
        inputRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [allMessages]);

    const sendMessage = async () => {
        if (ws?.readyState === WebSocket.OPEN && message !== '') {
            const date = new Date().toLocaleString('en-US', {
                hour12: false,
                timeZone: 'America/Sao_Paulo'
            }).split(',');

            const messageDate = new Date(date[0].trim());
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
            inputRef.current?.scrollIntoView({ behavior: "smooth" });
            setMessage('');
        }
    };

    return (
        <div className="h-[90vh] flex flex-col">
            <ol ref={messagesRef} className="flex overflow-y-auto flex-col gap-4 min-h-[75vh] mt-[20px] scrollbar">
                <div className="my-[10px]">
                    <p className="text-center text-gray-500">There are no previous messages</p>
                </div>
                {
                    allMessages
                        ? allMessages.map((message, index) => {
                            const messageAuthor = users.find((user) => user.id === message.user_id);
                            const previousMessage = allMessages[index - 1];

                            if (!messageAuthor) return null;

                            const showMessageSplitter = !previousMessage || new Date(message.date).getDate() != new Date(previousMessage?.date).getDate();

                            return (
                                <Fragment key={message.id}>
                                    {showMessageSplitter && <MessageSplitter key={message.date.toString()} date={message.date} />}
                                    <Message key={message.id} message={message} type={currentUser == message.user_id ? "owner" : "other"} user={messageAuthor} />
                                </Fragment>
                            )
                        })
                        : 'No messages found'
                }
                <div ref={inputRef} />
            </ol>
            {
                showDownButton ? (
                    <div
                        onClick={() => inputRef.current?.scrollIntoView({ behavior: "smooth" })}
                        className="absolute bottom-24 right-0 z-50 bg-gray-400 bg-opacity-50 backdrop-blur-sm pr-6 p-1 rounded-full rounded-r-[0] hover:cursor-pointer z-50">
                        <ArrowDownCircle
                            color='var(--foreground)'
                            className=" w-[25px] "
                        />
                    </div>

                ) : ''
            }

            <div className="bottom-[0] left-[calc(50vw-40vw-22.5px)] flex items-center justify-center space-x-[5px] pb-4 pt-2 mt-2 text-white bg-[linear-gradient(rgba(var(--background-rgb),0),rgba(var(--background-rgb),0.8))] backdrop-blur-[1px] z-50">

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
                        className="bg-transparent outline-none placeholder-white text-[16px] w-[100%] flex-wrap placeholder-opacity-50"
                    />


                    <button className="ml-3">
                        <Paperclip className="[20px] h-[20px] rotate-[135deg]" />
                    </button>
                </div>


                <button className="bg-wine p-[10px] rounded-full z-10" onClick={sendMessage}>
                    <Send className="w-[20px] h-[20px] rotate-[15deg]" />
                </button>
            </div>
        </div>
    )
}