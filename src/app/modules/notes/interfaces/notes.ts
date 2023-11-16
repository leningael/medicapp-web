import { PatientOverview } from "../../patient/interfaces/patient.interfaces";

export interface Notes {
    // database info
    _id?: string;
    patient: PatientOverview;
    doctor_name: string;
    date?: string;
    // information
    content: {
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
}

export interface NoteContent {
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
    dose: string;
    consume_method: string;
    frequency: string;
    duration: string;
    notes: string;
}
