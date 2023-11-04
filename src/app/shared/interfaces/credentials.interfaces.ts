export interface UserCredentials{
    app_token: string;
    user_credentials: UserData;
    role: string;
}

export interface UserData{
    _id: string;
    username: string;
    email: string;
    name: string;
    lastname: string;
}