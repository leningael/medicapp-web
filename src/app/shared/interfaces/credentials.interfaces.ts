export interface UserCredentials{
    token: string;
    user_credentials: UserData;
    role: string;
}

export interface UserData{
    username: string;
    email: string;
    name: string;
    lastname: string;
}