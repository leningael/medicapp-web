
export interface Patient {
    _id?:      string;
    name:      string;
    lastname:  string;
    gender:    string;
    curp:      string;
    birthdate: string;
    phone: string;
    email: string;
    address: string;
    zipcode: string;
    bloodtype: string;
    doctors:  string[];
    clinical_history?: ClinicalHistory;
}

export interface PatientOverview {
    _id: string
    name: string
    lastname: string
    curp: string
}

export interface ClinicalHistory {
    pathological?: string
    non_pathological?: string
    inherit?: string
    surgical?: string
    current_medication?: string
    allergies?: string
}