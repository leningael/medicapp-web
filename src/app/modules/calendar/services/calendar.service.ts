import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appointment, AppointmentMove, CreateAppointmentArgs, DayAppointments, TimeRange } from '../models/calendar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  apiUrl: string = environment.apiUrl;

  constructor(private http:HttpClient) { }

  setDrBusinnessHours(doctorId:string, businessHours:TimeRange): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/calendar/set_businness_hours/${doctorId}`, businessHours);
  }

  createAppointment(appointment:CreateAppointmentArgs): Observable<Appointment>{
    return this.http.post<Appointment>(`${this.apiUrl}/calendar/create_appointment`, appointment);
  }

  getDayAppointments(doctorId:string, date:string): Observable<DayAppointments>{
    const params = new HttpParams().set('date', date);
    return this.http.get<DayAppointments>(`${this.apiUrl}/calendar/get_day_appointments/${doctorId}`, {params});
  }

  deleteAppointment(appointmentId:string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/calendar/delete_appointment/${appointmentId}`);
  }

  moveAppointment(moveArgs:AppointmentMove): Observable<any>{
    console.log(moveArgs);
    return this.http.put<any>(`${this.apiUrl}/calendar/move_appointment`, moveArgs);
  }
}
