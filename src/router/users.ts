import express, { Request, Response } from 'express';

import { UserController } from '../user/user.controller';
import { IDescriptionUser } from '../user/user.dto';
import { getUserById } from '../user/user.schema';

export default (router: express.Router) => {
    // USER BY ID
    router.get('/users/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await getUserById(id);

            const descriptionUser: IDescriptionUser = {
                avatar: user.avatar,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                description: user.description,
                average_raiting: user.average_raiting,
                count_of_reviews: user.count_of_reviews,
                price_per_hour: user.price_per_hour,
                photo_types: user.photo_types
            }

            const controller = new UserController();
            const response = await controller.getUserById(id, descriptionUser);
            return res.status(200).send(response).end();
        }
        catch (err) {
            return res.status(400).send({
                reason: 'Ошибка получения данных'
            })
        }
    });
};
