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

import { ISignIn, ISignUp } from './auth.dto';
import { 
    IAuthSuccessResponse,
    IAuthBadResponse, 
    AuthService, 
    IAuthResponse
} from './auth.service';

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
    // SignUp
    @Response<IAuthBadResponse>(422, 'Validation Failed')
    @Response<IAuthResponse>(200, 'OK')
    @Example<IAuthResponse>({
        user: {
            id: '1',
            first_name: 'Valeria',
            last_name: 'Mikhailenko',
            email: 'test@gmail.com',
            role: 'photograph'
        },
        status:200, 
        access_token: 'your access_token', 
        refresh_token: 'your refresh_token'
    })
    @Post('signup')
    public async SignUp(
        @Body() requestBody: ISignUp,
        @Request() response: IAuthSuccessResponse
    ): Promise<IAuthResponse | IAuthBadResponse> {
        console.log('request in controller', response);
        return new AuthService().SignUp(requestBody, response);
    }

    // SignIn
    // @Response<IAuthBadResponse>(422, 'Validation Failed')
    // @Example<ISignIn>({
    //     email: 'test@gmail.com',
    //     pws:'12345678',
    //     remember_me: true
    // })
    // @Post('signin')
    // public async SignIn(
    //     response: IAuthSuccessResponse,
    //     @Body() requestBody: ISignIn
    // ): Promise<IAuthResponse | IAuthBadResponse> {
    //     return new AuthService().SignIn(requestBody, response);
    // }
}