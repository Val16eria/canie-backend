import express, { Request, Response } from 'express';
import { getUsersByRole, getUsersByFilter } from '../user/user.schema';

export default (router: express.Router) => {
    // MODELS
    router.get('/models', async (req: Request, res: Response) => {
        try {
            const { types_of_photography, price_per_hour, limit, offset } = req.body;

            if (!types_of_photography) {
                const response = await getUsersByRole('photograph');
                return res.status(200).json(response).end();
            }
            else {
                const response = await getUsersByFilter('photograph', types_of_photography);
                return res.status(200).json(response).end();
            }
        }
        catch (err) {
            return res.status(400).send({
                reason: 'Ошибка получения данных'
            })
        }
    });
};