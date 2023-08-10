import express, { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';

export default (router: express.Router) => {
    router.post('/auth/signin', async (req: Request, res: Response) => {
        const request = req.body;
        const controller = new AuthService();
        const response = await controller.SignIn(request);
        return res.send(response);
    });

    router.post('/auth/signup', async (req: Request, res: Response) => {
        const request = req.body;
        const controller = new AuthService();
        const response = await controller.SignUp(request);
        return res.send(response);
    });
};