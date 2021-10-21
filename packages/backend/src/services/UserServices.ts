import prisma from "../utils/prisma";

export default class UserService {
    async getUser(user_id: string) {
        const user = await prisma.user.findFirst({
            where: {
                id: user_id,
            }
        });

        return user;
    }
}