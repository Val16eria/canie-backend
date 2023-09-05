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

export interface IDescriptionUser {
    avatar: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    description: string;
    average_raiting: number;
    count_of_reviews: number;
    price_per_hour: number;
    photo_types: string[];
}
