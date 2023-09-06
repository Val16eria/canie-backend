export interface IAccessToken {
    access_token: string;
}

export interface IRefrshToken {
    refresh_token: string;
}

export type TTokens = IAccessToken & IRefrshToken;