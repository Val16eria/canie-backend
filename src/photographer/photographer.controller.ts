import { 
    Controller, 
    Query,
    Example, 
    Route, 
    Tags, 
    Response, 
    Request, 
    Get
} from 'tsoa';
import { IBadResponse } from '../error/error.dto';
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
        @Query() price_per_hour: number[] = [100, 35000],
        @Query() types_of_photos?: string[],
        @Query() limit?: number,
        @Query() offset?: number

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