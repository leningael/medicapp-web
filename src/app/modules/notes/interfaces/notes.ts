export interface Notes {
    // database info
    id: string;
    title: string;
    doctor_name: string;
    pacient_name: string;
    date: string;
    // information
    reason: string;
    information: string;
    diagnosis: string;
    temperature: string;
    weight: string;
    height: string;
    imc: string;
    sistolic_pressure: string;
    diastolic_pressure: string;
    medication: Meds[];
}


export interface Meds{
    medicament: string;
    quantity: string;
    consume_method: string;
    frequency: string;
    duration: string;
    notes: string;
}
