import { IUser } from '../user/user.dto';

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
    public SignUp(dto: IUser, response: IAuthSuccessResponse): IAuthResponse | IAuthBadResponse {
        try {
            return {
                user: {
                    id: dto.id,
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

    public SignIn(dto: IUser, response: IAuthSuccessResponse): IAuthResponse | IAuthBadResponse {
        try {
            return {
                user: {
                    id: dto.id,
                    first_name: dto.first_name,
                    last_name: dto.last_name,
                    email: dto.email,
                    role: dto.role
                },
                ...response
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
