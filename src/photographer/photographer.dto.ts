export interface IPhotographerList {
    photograph_avatar: string;
    full_name: string;
    description: string;
    average_raiting: number;
    count_of_reviews: number;
}

export interface IPhotographerQueryParams {
    price_per_hour: Array<IPricePerHour>;
    types_of_photography: typeof photographerTypes;
    limit: number;
    offset: number;
}

interface IPricePerHour {
    min: number;
    max: number;
}

const photographerTypes = [
    'wedding', 
    'love_story', 
    'family', 
    'pets', 
    'reportage', 
    'model_tests', 
    'tfp'
];
