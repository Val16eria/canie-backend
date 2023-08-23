import express, { Request, Response } from 'express';
import { PhotographerController } from '../photographer/photographer.controller';
import { getAllPhotographers } from '../user/user.schema';

export default (router: express.Router) => {
    // PHOTOGRAPHERS
    router.get('/photographers', async (req: Request, res: Response) => {
        try {
            const { types_of_photography, limit, offset } = req.body;

            const allPhotographers = await getAllPhotographers();
            return res.status(200).json(allPhotographers).end();
        }
        catch (err) {
            return res.status(400).send({
                reason: 'Ошибка получения данных'
            })
        }
    });
};