import express, { Request, Response } from 'express';

import { getUsersByFilter } from '../user/user.schema';
import { ModelController } from '../model/mode.controller';
import { IModel } from '../model/model.dto';

export default (router: express.Router) => {
    // MODELS
    router.get('/models', async (req: Request, res: Response) => {
        try {
            const types_of_photos = (
                req.query.types_of_photos === undefined ? 
                undefined : 
                (String(req.query.types_of_photos)).split(',')
            );
            const limit = Number(req.query.limit);
            const offset = Number(req.query.offset);
            const price_per_hour = (String(req.query.price_per_hour)).split(',').map((i) => parseInt(i));

            const models = await getUsersByFilter({
                role_name: 'model', 
                query: { 
                    price_per_hour,
                    types_of_photos,
                    limit,
                    offset,
                }
            });


            const modelsResponse: IModel[] = models.map((item) => {
                return {
                    model_avatar: item.avatar,
                    full_name: `${item.first_name} ${item.last_name}`,
                    description: item.description,
                    average_raiting: item.average_raiting,
                    count_of_reviews: item.count_of_reviews
                }
            });
            
            const controller = new ModelController();
            const response = await controller.ModelList(modelsResponse);
            return res.status(200).json(response).end();

        }
        catch (err) {
            return res.status(400).send({
                reason: 'Ошибка получения данных'
            })
        }
    });
};