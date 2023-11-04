export interface TimeRange {
    start_time: string;
    end_time: string;
}

export class BuissinessHours implements TimeRange {
    start_time: string;
    end_time: string;

    constructor(){
        this.start_time = '09:00';
        this.end_time = '18:00';
    }

    getHoursRange(): string{
        return `${this.start_time} - ${this.end_time}`;
    }
}

export interface CreateAppointmentArgs {
    doctor_id: string;
    patient_id: string;
    cause: string;
    start_datetime: string;
    end_datetime: string;
}

export interface Appointment {
    _id: string;
    cause: string;
    start_datetime: string;
    end_datetime: string;
    patient: PatientInfo;
}

export interface PatientInfo {
    _id: string;
    name: string;
    lastname: string;
    email: string;
}

export interface DayAppointments {
    business_hours: TimeRange;
    appointments: Appointment[];
}

export interface CalendarSlot {
    time: string;
    appointment: Appointment | false;
}