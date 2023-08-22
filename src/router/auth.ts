import express, { Request, Response } from 'express';

import { IAuthUser } from '../user/user.dto';
import { createUser, getUserByEmail } from '../user/user.schema';
import { 
    random, 
    authentication, 
    generateToken, 
    SECRET_ACCESS,
    SECRET_REFRESH,
    refreshTokens
} from '../auth/auth.helpers';
import { AuthController } from '../auth/auth.controller';

export default (router: express.Router) => {
    // SIGNUP
    router.post('/auth/signup', async (req: Request, res: Response) => {
        try {
            const { first_name, last_name, email, pws, role } = req.body;
            if (!first_name || !last_name || !email || !pws || !role) {
                return res.status(400).send({
                    reason: 'Поле не заполнено'
                });
            }

            const existingUser = await getUserByEmail(email);
            if (existingUser) {
                res.status(400).send({
                    reason: 'Пользователь с таким email уже существует'
                });
            }
            else {
                const accesToken = generateToken(first_name, role, SECRET_ACCESS);
                const refreshToken = generateToken(first_name, role, SECRET_REFRESH);
                refreshTokens.push(refreshToken);

                const salt = random();
                const user = await createUser({
                    first_name,
                    last_name,
                    email,
                    role,
                    authentication: {
                        pws: authentication(salt, pws),
                        access_token: accesToken,
                        refresh_token: refreshToken,
                        salt
                    }
                });

                res.cookie('CANIE-AUTH', user.authentication.refresh_token, {
                    domain: 'loclhost',
                    path: '/'
                })

                const authUser: IAuthUser = {
                    user: {
                        id: user._id.toString(),
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        role: user.role
                    },
                    authentication: {
                        access_token: user.authentication.access_token,
                        refresh_token: user.authentication.refresh_token
                    }
                }

                const controller = new AuthController();
                const response = await controller.SignUp(authUser);
                return res.status(200).send(response);
            }
        } 
        catch (err) {
            console.log(err)
            return res.status(400).send({
                reason: 'Ошибка регистрации'
            })
        }
    });

    // SIGNIN
    router.post('/auth/signin', async (req: Request, res: Response) => {
        try {
            const { email, pws, remember_me } = req.body;

            if (!email || !pws ) {
                return res.status(400).send({
                    reason: 'Поле не заполнено'
                });
            }

            const user = await getUserByEmail(email);
            console.log('user ->', user);
            if (!user) {
                return res.status(400).send({
                    reason: 'Пользователя с таким email не существует'
                });
            }

            const accesToken = generateToken(user.first_name, user.role, SECRET_ACCESS);
            let refreshToken;
            if (remember_me) {
                refreshToken = generateToken(user.first_name, user.role, SECRET_REFRESH, { expiresIn: '1h' });
            }
            else {
                refreshToken = generateToken(user.first_name, user.role, SECRET_REFRESH);
            }
            refreshTokens.push(refreshToken);

            const expectedHash = authentication(user.authentication.salt, pws);

            if (user.authentication.pws != expectedHash) {
                return res.status(403).send({
                    reason: 'Неправильный ввод данных'
                });
            }

            user.authentication.access_token = accesToken;
            user.authentication.refresh_token = refreshToken;
            await user.save();

            res.cookie('CANIE-AUTH', user.authentication.refresh_token, {
                domain: 'loclhost',
                path: '/'
            })

            const authUser: IAuthUser = {
                user: {
                    id: user._id.toString(),
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role
                },
                authentication: {
                    access_token: user.authentication.access_token,
                    refresh_token: user.authentication.refresh_token
                }
            }

            const controller = new AuthController();
            const response = await controller.SignIn(authUser);
            return res.status(200).send(response).end();
        }
        catch (err) {
            return res.status(400).send({
                reason: 'Ошибка авторизации'
            }).end();
        }
    });

    router.post('/auth/logout', async (req: Request, res: Response) => {
        try {
            const { token } = req.body;

            refreshTokens.filter((t) => t !== token);
            
            const controller = new AuthController();
            const response = await controller.Logout();
            return res.status(200).send(response).end();
        }
        catch (err) {
            return res.status(400).send({
                reason: 'Ошибка выхода'
            }).end();
        }
    });
};