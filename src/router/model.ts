import express, { Request, Response } from 'express';
import { getAllModels } from '../user/user.schema';

export default (router: express.Router) => {
    // MODELS
    router.get('/models', async (req: Request, res: Response) => {
        try {
            const { types_of_model, offset, limit } = req.body;

                const allModels = await getAllModels();
                return res.status(200).json(allModels).end();
        }
        catch (err) {
            console.log(err)
            return res.status(400).send({
                reason: 'Ошибка получения данных'
            })
        }
    });
};