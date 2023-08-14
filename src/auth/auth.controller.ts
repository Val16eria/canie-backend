import {
    Example,
    Tags,
    Body,
    Controller,
    Post,
    Route,
    Response,
    Request,
} from 'tsoa';

import { IBadResponse, ISignIn, ISignUp } from './auth.dto';
import { IAuthUser } from '../user/user.dto';

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
    // SignUp
    @Response<IBadResponse>(400, 'Validation Failed')
    @Response(200, 'OK')
    @Example<IAuthUser>({
        user: {
            id: '1',
            first_name: 'Valeria',
            last_name: 'Mikhailenko',
            email: 'test@gmail.com',
            role: 'photograph'
        },
        authentication: {
            access_token: 'your access_token', 
            refresh_token: 'your refresh_token'
        }
    })
    @Post('signup')
    public async SignUp(
        @Request() user: IAuthUser,
        @Body() _requestBody?: ISignUp,
    ): Promise<IAuthUser | IBadResponse> {
        try {
            return user;
        }
        catch (err) {
            return {
                reason: err.message
            }
        }
    }

    // SignIn
    @Response<IBadResponse>(400, 'Validation Failed')
    @Response(200, 'OK')
    @Example<IAuthUser>({
        user: {
            id: '1',
            first_name: 'Valeria',
            last_name: 'Mikhailenko',
            email: 'test@gmail.com',
            role: 'photograph'
        },
        authentication: {
            access_token: 'your access_token', 
            refresh_token: 'your refresh_token'
        }
    })
    @Post('signin')
    public async SignIn(
        @Request() user: IAuthUser,
        @Body() _requestBody?: ISignIn
    ): Promise<IAuthUser | IBadResponse> {
        try {
            return user;
        }
        catch (err) {
            return {
                reason: err.message
            }
        }
    }
}