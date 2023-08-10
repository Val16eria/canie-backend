import { getUserId } from '../user/user.schema';
import { IUser } from '../user/user.dto';
import { ISignIn, ISignUp } from './auth.dto';

export interface IAuthResponse extends IAuthSuccessResponse {
    user: IUser
}

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
    public SignUp(dto: ISignUp, response: IAuthSuccessResponse): IAuthResponse | IAuthBadResponse {
        try {
            return {
                user: {
                    id: getUserId(),
                    first_name: dto.first_name,
                    last_name: dto.last_name,
                    email: dto.email,
                    role: dto.role
                },
                ...response
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

    // public SignIn(dto: IUser, response: IAuthSuccessResponse): IAuthResponse | IAuthBadResponse {
    //     try {
    //         return {
    //             user: {
    //                 first_name: dto.first_name,
    //                 last_name: dto.last_name,
    //                 email: dto.email,
    //                 role: dto.role
    //             },
    //             ...response
    //         }
    //     }
    //     catch (err) {
    //         console.log('Ошибка авторизации', err);
    //         return {
    //             status: err,
    //             error_message: 'Ошибка авторизации'
    //         }
    //     }
    // }
}
