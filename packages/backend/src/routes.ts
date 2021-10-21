import { Router, Request, Response } from 'express';
import AuthUserController from './controllers/AuthUserController';
import MessageController from './controllers/MessageController';
import ensureAuth from './middlewate/ensureAuth';

const router = Router();

router.post('/authenticate', AuthUserController.handle)

// Create Message
router.post('/messages', ensureAuth, MessageController.create)

router.get('/auth/github', (req: Request, res: Response) => {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    )
})

router.get('/auth/github/callback', (req: Request, res: Response) => {
    const { code } = req.query;

    return res.json(code);
})

export default router;