import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../interfaces/patient.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  apiUrl: string = environment.apiUrl;
  //apiUrl = 'http://127.0.0.1:7004'
  constructor(
    private http: HttpClient,
  ) {}
  
  getAllExistingPatients(search?: string): Observable<Patient[]> {
    const params = new HttpParams();
    if (search) params.set('search', search);
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`, {params} );
  }

  getDrPatients(doctor_id: string, search?: string): Observable<Patient[]> {
    const params = new HttpParams();
    if (search) params.set('search', search);
    return this.http.get<Patient[]>(`${this.apiUrl}/patients/doctor/${doctor_id}`, {params} );
  }

  updatePatients(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/patients`, patient);
  }
  deletePatient(patient_id: string): Observable<Patient> {
    return this.http.delete<Patient>(`${this.apiUrl}/patients/${patient_id}`);
  }

}
