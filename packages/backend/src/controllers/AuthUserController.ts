import { Request, Response } from 'express';
import AuthUserServices from '../services/AuthUserServices';

class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        try {
            const { code } = req.body;

            const service = new AuthUserServices();
            const result = await service.execute(code);

            res.json(result);
        } catch (err) {
            const error = err?.data?.message || err?.message || err;
            const code: number = err?.status || 500;
            res.status(code).json({ error });
        }

    }
}

export default new AuthenticateUserController();