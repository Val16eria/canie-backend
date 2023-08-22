import { IBadResponse } from '../error/error.dto';
import { Controller, Tags, Response, Request, Route, Example, Post, Body } from 'tsoa';
import { IAccessToken, IRefrshToken } from './token.dto';

@Route('token')
@Tags('Token')
export class TokenController extends Controller {
    // Token
    @Response<IBadResponse>(400, 'Token Failed')
    @Response<string>(200, 'OK')
    @Example<IAccessToken>({
        access_token: 'access_token'
    })
    @Post('')
    public async Token(
        @Request() accessToken: string,
        @Body() _requestBody: IRefrshToken
    ): Promise<IAccessToken | IBadResponse> {
        try {
            return {
                access_token: accessToken
            }
        }
        catch (err) {
            return {
                reason: err.message,
            }
        }
    }
}