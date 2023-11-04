import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appointment, BuissinessHours, CreateAppointmentArgs, DayAppointments } from '../models/calendar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  apiUrl: string = environment.apiUrl;

  constructor(private http:HttpClient) { }

  setDrBusinnessHours(doctorId:string, businessHours:BuissinessHours): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/calendar/set_businnes_hours/${doctorId}`, businessHours);
  }

  createAppointment(appointment:CreateAppointmentArgs): Observable<Appointment>{
    return this.http.post<Appointment>(`${this.apiUrl}/calendar/create_appointment`, appointment);
  }

  getDayAppointments(doctorId:string, date:string): Observable<DayAppointments>{
    const params = new HttpParams().set('date', date);
    return this.http.get<DayAppointments>(`${this.apiUrl}/calendar/get_day_appointments/${doctorId}`, {params});
  }
}
