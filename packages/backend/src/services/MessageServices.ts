import { Message, User } from ".prisma/client";
import { io } from "../app";
import prisma from "../utils/prisma";

type DataMessage = Message & { user: User }

export default class MessageService {
    emitMessage(message: DataMessage) {
        const { text, user_id, created_ai, user } = message;
        const info = {
            text,
            user_id,
            created_ai,
            user: {
                name: user.name,
                avatar_url: user.avatar_url,
            }
        }

        io.emit('new_message', info);
    }

    async create(text: string, owner_id: string) {
        const message = await prisma.message.create({
            data: {
                text,
                user_id: owner_id,
            },
            include: { user: true }
        });

        this.emitMessage(message);

        return message;
    }
}