import express, { Request, Response } from 'express';

import { createUser, getUserByEmail } from '../user/user.schema';
import { random, authentication } from '../auth/auth.helpers';
import { AuthController } from '../auth/auth.controller';

export default (router: express.Router) => {
    router.post('/auth/signup', async (req: Request, res: Response) => {
        try {
            const { first_name, last_name, email, pws, role } = req.body;
            if (!first_name || !email || !pws) {
                return res.sendStatus(400);
            }

            const existingUser = await getUserByEmail(email);
            if (existingUser) {
                return res.sendStatus(400);
            }

            const salt = random();
            const user = await createUser({
                first_name,
                last_name,
                email,
                role,
                authentication: {
                    pws: authentication(salt, pws),
                    access_token: salt,
                    refresh_token: salt,
                    salt
                }
            });

            const controller = new AuthController();
            const response = await controller.SignUp({
                id: user._id.toString(),
                first_name: user.first_name, 
                last_name: user.last_name, 
                email: user.email,
                role: user.role
            }, {
                status: 200,
                access_token: user.authentication.access_token,
                refresh_token: user.authentication.refresh_token,
            });
            return res.status(200).send(response).end();
        }
        catch (err) {
            console.log('err', err);
            return res.sendStatus(400);
        }
    });

    router.post('/auth/signin', async (req: Request, res: Response) => {
        try {
            const { email, pws } = req.body;

            if (!email || !pws) {
                return res.sendStatus(400);
            }

            const user = await getUserByEmail(email).select('+authentication.salt +authentication.pws');

            if (!user) {
                return res.sendStatus(400);
            }

            const expectedHash = authentication(user.authentication.salt, pws);

            if (user.authentication.pws != expectedHash) {
                return res.sendStatus(403);
            }

            const salt = random();
            user.authentication.access_token = authentication(salt, user._id.toString());
            user.authentication.refresh_token = authentication(salt, user._id.toString());
            await user.save();

            res.cookie('CANIE-AUTH', user.authentication.refresh_token, 
            { domain: 'localhost', path: '/' });

            const controller = new AuthController();
            const response = await controller.SignIn({
                id: user._id.toString(),
                first_name: user.first_name, 
                last_name: user.last_name, 
                email: user.email,
                role: user.role
            }, {
                status: 200,
                access_token: user.authentication.access_token,
                refresh_token: user.authentication.refresh_token,
            });
            return res.status(200).send(response).end();
        }
        catch (err) {
            console.log('err', err);
            return res.sendStatus(400);
        }
    });
};