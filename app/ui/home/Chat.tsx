import { getMessageById, getUserInfoById } from "@/app/lib/data"
import { ChatType, MessageType, UserInfoType } from "@/app/lib/definitions"
import { User } from "@geist-ui/icons";

export default async function chat({ chat }: { chat: ChatType }) {
    const usernameRequest: UserInfoType = {
        type: 'username'
    }
    /* pega um único usuário */
    const username = await getUserInfoById(chat.members.filter(value => value !== 3 /* esse 3 deve ser o id do usuario atual */)[0], usernameRequest);
    const lastMessage: MessageType | null = await getMessageById(chat.last_message);
    if (username !== null) {
        return (
            <li className={`flex justify-between w-[84vw] mx-[8vw]`}>
                <div className="flex w gap-5">
                    <User className='w-[35px] h-[35px] border-2 rounded-full' />

                    <div className="flex flex-col">
                        <p className="font-semibold">
                            {username}
                        </p>
                        <p className="font-light text-xs ml-2">
                            {   
                                /* fazer um limite de tamanho */
                                lastMessage == null ? '' : lastMessage.text
                            }
                        </p>
                    </div>
                </div>
                <p className="font-medium text-sm">
                    {
                        lastMessage == null ? '' : lastMessage.time.split(':').slice(0, 2).join(':')
                    }
                </p>
            </li>
        )
    }

}