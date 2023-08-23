export interface IPhotographer {
    photograph_avatar: string;
    full_name: string;
    description: string;
    average_raiting: number;
    count_of_reviews: number;
}

export interface IPhotographerParams {
    price_per_hour?: number[];
    types_of_photography?: string[];
    limit?: number;
    offset?: number;
}

export interface IPricePerHour {
    min: number;
    max: number;
}