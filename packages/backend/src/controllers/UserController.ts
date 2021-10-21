import { Request, Response } from "express";
import UserService from "../services/UserServices";

class UserController {
    async getUser(req: Request, res: Response) {
        const service = new UserService();

        const user = await service.getUser(req.user_id);

        res.json(user);
    }
}

export default new UserController();