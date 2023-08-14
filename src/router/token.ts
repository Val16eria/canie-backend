import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { 
    SECRET_ACCESS, 
    SECRET_REFRESH, 
    refreshTokens 
} from '../auth/auth.helpers';

export default (router: express.Router) => {
    router.post('/token', (req: Request, res: Response) => {
        const { token } = req.body;
    
        if (!token) {
            return res.sendStatus(401);
        }
    
        if (!refreshTokens.includes(token)) {
            return res.sendStatus(403);
        }
    
        jwt.verify(token, SECRET_REFRESH, (err: any, user: any) => {
            if (err) {
                return res.sendStatus(403);
            }
    
            const accessToken = jwt.sign({ name: user.username, role: user.role }, SECRET_ACCESS, { expiresIn: '1h' });
    
            res.json({
                accessToken
            });
        });
    });
}