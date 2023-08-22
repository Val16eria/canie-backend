import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { 
    SECRET_ACCESS, 
    SECRET_REFRESH, 
    refreshTokens 
} from '../auth/auth.helpers';
import { TokenController } from '../token/token.controller';

export default (router: express.Router) => {
    router.post('/token', (req: Request, res: Response) => {
        try {
            const { refresh_token } = req.body;
    
            if (!refresh_token) {
                return res.sendStatus(401);
            }
    
            if (!refreshTokens.includes(refresh_token)) {
                return res.sendStatus(403);
            }
    
            jwt.verify(refresh_token, SECRET_REFRESH, async (err: any, user: any) => {
                if (err) {
                    return res.sendStatus(403);
                }
    
                const access_token = jwt.sign({ name: user.username, role: user.role }, SECRET_ACCESS, { expiresIn: '1h' });
                const controller = new TokenController();
                const response = await controller.Token(access_token, {refresh_token: refresh_token});
                return res.status(200).send(response).end();
            });
        }
        catch (err) {
            return res.status(400).send({
                reason: 'Ошибка получения токена'
            }).end();
        }
    });
}