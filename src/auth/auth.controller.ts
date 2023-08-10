import {
    Example,
    Tags,
    Body,
    Controller,
    Post,
    Route,
    Response,
} from 'tsoa';

import { ISignIn, ISignUp } from './auth.dto';
import { 
    IAuthSuccessResponse,
    IAuthBadResponse, 
    AuthService 
} from './auth.service';

@Route('auth')
@Tags('Auth')
export class authController extends Controller {
    // SignUp
    @Response<IAuthBadResponse>(422, 'Validation Failed')
    @Example<ISignUp>({
        first_name: 'Valeria',
        last_name: 'Mikhailenko',
        email: 'test@gmail.com',
        pws: '12345678',
        role: 'photograph'
    })
    @Post('signup')
    public async SignUp(
        @Body() requestBody: ISignUp
    ): Promise<IAuthSuccessResponse | IAuthBadResponse> {
        return new AuthService().SignUp(requestBody);
    }

    // SignIn
    @Response<IAuthBadResponse>(422, 'Validation Failed')
    @Example<ISignIn>({
        email: 'test@gmail.com',
        pws:'12345678',
        remember_me: true
    })
    @Post('signin')
    public async SignIn(
        @Body() requestBody: ISignIn
    ): Promise<IAuthSuccessResponse | IAuthBadResponse> {
        return new AuthService().SignIn(requestBody);
    }
}