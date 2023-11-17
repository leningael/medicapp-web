export interface AccountOverview{
    _id: string;
    username: string;
    name: string;
    lastname:string;
    role: string;
    email: string;
}

export interface AccountCreate{
    username: string;
    role: string;
    name: string;
    lastname:string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface AccountEdit{
    username: string;
    name: string;
    lastname:string;
    email: string;
    password?: string;
}