import express, { Request, Response } from 'express';

import { getUsersByFilter } from '../user/user.schema';
import { PhotographerController } from '../photographer/photographer.controller';
import { IPhotographer } from '../photographer/photographer.dto';

export default (router: express.Router) => {
    // PHOTOGRAPHERS
    router.get('/photographers', async (req: Request, res: Response) => {
        try {
            const types_of_photos = (
                req.query.types_of_photos === undefined ? 
                undefined : 
                (String(req.query.types_of_photos)).split(',')
            );
            const limit = Number(req.query.limit);
            const offset = Number(req.query.offset);
            const price_per_hour = (String(req.query.price_per_hour)).split(',').map((i) => parseInt(i));

            const photographers = await getUsersByFilter({
                role_name: 'photograph',
                query: { 
                    price_per_hour,
                    limit,
                    offset,
                    types_of_photos
                }
            });

            const photographersResponse: IPhotographer[] = photographers.map((item) => {
                return {
                    photograph_avatar: item.avatar,
                    full_name: `${item.first_name} ${item.last_name}`,
                    description: item.description,
                    average_raiting: item.average_raiting,
                    count_of_reviews: item.count_of_reviews
                }
            });
            
            const controller = new PhotographerController();
            const response = await controller.PhotographersList(photographersResponse);
            // {
            //     price_per_hour,
            //     types_of_photos,
            //     limit,
            //     offset
            // }
            return res.status(200).json(response).end();
        }
        catch (err) {
            return res.status(400).send({
                reason: 'Ошибка получения данных'
            })
        }
    });
};