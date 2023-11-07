
export interface Patient {
    _id?:      string;
    name:      string;
    lastname:  string;
    gender:    string;
    curp:      string;
    birthdate: string;
    phone:     string;
    email:     string;
    address:   string;
    zipcode:   string;
    bloodtype: string;
    doctors:     Array<string>;
}

export interface PatientOverview {
    _id: string
    name: string
    lastname: string
    curp: string
}