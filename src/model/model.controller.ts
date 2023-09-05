import { 
    Controller, 
    Route, 
    Response, 
    Request, 
    Tags, 
    Example, 
    Get, 
    Query
} from 'tsoa';
import { IBadResponse } from '../error/error.dto';
import { IModel } from './model.dto';

@Route('models')
@Tags('Models')
export class ModelController extends Controller {
    // Model
    @Response<IBadResponse>(400, 'Model Failed')
    @Response<string>(200, 'OK')
    @Example<IModel[]>([{
        id: '1',
        model_avatar: 'https://i.pinimg.com/736x/ff/75/e7/ff75e70833921cbb8ff7e2c4d36167bd.jpg',
        full_name: 'Valeria Mikhailenko',
        description: 'For more than 3 years I have specialized in modeling urban and natural objects, as well as portraits',
        average_raiting: 5,
        count_of_reviews: 345
    }])
    @Get('')
    public async ModelList(
        @Request() requestBody: IModel[],
        @Query() price_per_hour: number[] = [100, 35000],
        @Query() types_of_photos?: string[],
        @Query() limit?: number,
        @Query() offset?: number
    ): Promise<IModel[] | IBadResponse> {
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
