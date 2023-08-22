export interface ISignIn {
    email: string;
    pws: string;
    remember_me: boolean;
}

export interface ISignUp {
    first_name: string;
    last_name: string;
    email: string;
    pws: string;
    role: string
}
