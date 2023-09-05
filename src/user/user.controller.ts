import { 
    Controller, 
    Example, 
    Route, 
    Response, 
    Request, 
    Tags, 
    Get, 
    Path 
} from 'tsoa';

import { IBadResponse } from '../error/error.dto';
import { IDescriptionUser } from '../user/user.dto';

@Route('users')
@Tags('Users')
export class UserController extends Controller {
    // User by id
    @Response<IBadResponse>(400, 'Users Failed')
    @Response<string>(200, 'OK')
    @Example<IDescriptionUser>({
        avatar: 'https://i.pinimg.com/736x/ff/75/e7/ff75e70833921cbb8ff7e2c4d36167bd.jpg',
        first_name: 'Valeria',
        last_name: 'Mikhailenko',
        email: 'test@gmail.com',
        role: 'photograph',
        description: 'For more than 3 years I have been specializing in shooting urban and natural objects, as well as portraits',
        average_raiting: 5,
        count_of_reviews: 265,
        price_per_hour: 1600,
        photo_types: ['wedding', 'pets', 'model_tests']
    })
    @Get('{userId}')
    public async getUserById(
        @Path() userId: string,
        @Request() requestBody: IDescriptionUser,
    ): Promise<IDescriptionUser | IBadResponse> {
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