import { 
    Controller, 
    Queries, 
    Example, 
    Route, 
    Tags, 
    Response, 
    Request, 
    Get
} from 'tsoa';
import { IBadResponse } from '../error/error.dto';
import { IPhotoParams } from '../user/user.dto';
import { IPhotographer } from './photographer.dto';

@Route('photographers')
@Tags('Photographers')
export class PhotographerController extends Controller {
    // Photographer
    @Response<IBadResponse>(400, 'Photographer Failed')
    @Response<string>(200,'OK')
    @Example<IPhotographer[]>([{
        photograph_avatar: 'https://i.pinimg.com/736x/ff/75/e7/ff75e70833921cbb8ff7e2c4d36167bd.jpg',
        full_name: 'Valeria Mikhailenko',
        description: 'For more than 3 years I have been specializing in shooting urban and natural objects, as well as portraits',
        average_raiting: 5,
        count_of_reviews: 345
    }])
    @Get('')
    public async PhotographersList(
        @Request() requestBody: IPhotographer[],
        @Queries() _params: IPhotoParams,
    ): Promise<IPhotographer[] | IBadResponse> {
        try {
            return requestBody;
        }
        catch (err) {
            return {
                reason: err.message,
            }
        }
    }
}