export interface UserCredentials{
    token: string;
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

export interface UserEditData{
    _id: string;
    username?: string;
    email?: string;
    name?: string;
    lastname?: string;
    password?: string;
}

export interface SelectPersonArgs{
    search?: string;
    doctor_id?: string;
}

export interface useInformation{
    numberPatients: number;
    numberAppointments: number;
    numberReceptionists: number;
}