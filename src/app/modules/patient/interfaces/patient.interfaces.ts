
export interface Patient {
    _id:       string;
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
    owner:     Array<string>;
}
