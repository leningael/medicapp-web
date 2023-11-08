import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient, PatientOverview } from '../interfaces/patient.interfaces';
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
  
  getAllExistingPatients(search?: string): Observable<PatientOverview[]> {
    const params = new HttpParams();
    if (search) params.set('search', search);
    return this.http.get<PatientOverview[]>(`${this.apiUrl}/patients`, {params} );
  }

  getDrPatients(doctor_id: string, search?: string): Observable<PatientOverview[]> {
    const params = new HttpParams();
    if (search) params.set('search', search);
    return this.http.get<PatientOverview[]>(`${this.apiUrl}/patients/doctor/${doctor_id}`, {params} );
  }

  getPatient(patient_id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patients/${patient_id}`);
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, patient);
  }

  updatePatient(patient_id: string, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/patients/${patient_id}`, patient);
  }

  deletePatient(patient_id: string): Observable<Patient> {
    return this.http.delete<Patient>(`${this.apiUrl}/patients/${patient_id}`);
  }

}
