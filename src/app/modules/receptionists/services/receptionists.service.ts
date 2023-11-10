import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReceptionistOverview } from '../interfaces/receptionists.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistsService {
  apiUrl: string = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getReceptionists():Observable<ReceptionistOverview[]> {
    return this.http.get<ReceptionistOverview[]>(`${this.apiUrl}/receptionist`);
  }

  getDrReceptionists(doctor_id:string):Observable<ReceptionistOverview[]> {
    return this.http.get<ReceptionistOverview[]>(`${this.apiUrl}/receptionist/${doctor_id}`);
  }

  assignDoctor(receptionist_id:string, doctor_id:string):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/receptionist/assign_doctor`, {receptionist_id, doctor_id});
  }

  unassignDoctor(receptionist_id:string, doctor_id:string):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/receptionist/unassign_doctor`, {receptionist_id, doctor_id});
  }

}
