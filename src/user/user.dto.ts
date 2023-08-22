import { TTokens } from '../token/token.dto';

export interface IUser {
    id: string,
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}

export interface IAuthUser {
    user: IUser;
    authentication: TTokens;
}