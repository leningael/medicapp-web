import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAllReceptionists(doctor_id?:string, search?: string):Observable<ReceptionistOverview[]> {
    let params = new HttpParams();
    if(doctor_id) params = params.append('doctor_id', doctor_id);
    if(search) params = params.append('search', search);
    return this.http.get<ReceptionistOverview[]>(`${this.apiUrl}/receptionist/all_receptionists`, {params});
  }

  getDrReceptionists(doctor_id:string, search?: string):Observable<ReceptionistOverview[]> {
    let params = new HttpParams();
    if(search) params = params.append('search', search);
    return this.http.get<ReceptionistOverview[]>(`${this.apiUrl}/receptionist/dr_receptionists/${doctor_id}`, {params});
  }

  assignDoctor(receptionist_id:string, doctor_id:string):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/receptionist/assign_doctor`, {receptionist_id, doctor_id});
  }

  unassignDoctor(receptionist_id:string, doctor_id:string):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/receptionist/unassign_doctor`, {receptionist_id, doctor_id});
  }

}
