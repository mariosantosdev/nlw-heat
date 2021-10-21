import { Request, Response } from "express";
import MessageService from "../services/MessageServices";

class MessageController {
    async handle(req: Request, res: Response) {
        const { message } = req.body;
        const { user_id } = req;

        if (!message) return res.status(400).json({ errorCode: 'message.invalid' })

        const service = new MessageService();

        const result = await service.execute(message, user_id);

        return res.json(result)
    }
}

export default new MessageController();