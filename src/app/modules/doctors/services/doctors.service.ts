import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DoctorOverview } from '../interfaces/doctors.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  apiUrl: string = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getReceptionistDoctors(receptionistId: string, search: string):Observable<DoctorOverview[]> {
    let params = new HttpParams();
    if(search) params = params.append('search', search);
    return this.http.get<DoctorOverview[]>(`${this.apiUrl}/get_receptionist_doctors/${receptionistId}`, { params });
  }
}
