import { ISignIn, ISignUp } from './auth.dto';

export interface IAuthSuccessResponse {
    status: number,
    access_token: string,
    refresh_token: string
}

export interface IAuthBadResponse {
    status: number,
    error_message: string
}

export class AuthService {
    public SignUp(dto: ISignUp): IAuthSuccessResponse | IAuthBadResponse {
        try {
            return {
                status: 200,
                access_token: '',
                refresh_token: ''
            }
        }
        catch (err) {
            console.log('Ошибка регистрации', err);
            return {
                status: err,
                error_message: 'Ошибка регистрации'
            }
        }
    }

    public SignIn(dto: ISignIn): IAuthSuccessResponse | IAuthBadResponse {
        try {
            return {
                status: 200,
                access_token: '',
                refresh_token: ''
            }
        }
        catch (err) {
            console.log('Ошибка авторизации', err);
            return {
                status: err,
                error_message: 'Ошибка авторизации'
            }
        }
    }
}
