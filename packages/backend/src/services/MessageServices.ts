import prisma from "../utils/prisma";

export default class MessageService {
    async execute(text: string, owner_id: string) {
        const message = await prisma.message.create({
            data: {
                text,
                user_id: owner_id,
            },
            include: { user: true }
        });

        return message;
    }
}