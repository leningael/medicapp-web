
export interface Doctor {
    _id:            string;
    username:       string;
    name:           string;
    lastname:       string;
    email:          string;
    password:       string;
    role:           string;
    business_hours: BusinessHours;
    
}

export interface BusinessHours {
    start_time: string;
    end_time:   string;
}


