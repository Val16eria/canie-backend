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

export interface IPhotoParams {
    price_per_hour: number[];
    types_of_photos?: string[];
    limit?: number;
    offset?: number;
}