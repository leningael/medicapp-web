import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient, PatientOverview } from '../interfaces/patient.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient,
  ) {}
  
  get_patients(): Observable<PatientOverview[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`);
  }

  getPatientsByTerm(term: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients/search/${term}`);
  }

  getDrPatients(doctor_id: string): Observable<PatientOverview[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients/doctor/${doctor_id}`);
  }

  delete_patient(patient_id: string): Observable<Patient> {
    return this.http.delete<Patient>(`${this.apiUrl}/patients/${patient_id}`);
  }

}
