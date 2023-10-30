import { HttpClient } from '@angular/common/http';
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
  
  get_patients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`);
  }

  get_my_patients(doctor_id: string): Observable<Patient[]> {
    console.log("apiUrl: " + this.apiUrl)
    return this.http.get<Patient[]>(`${this.apiUrl}/patients/doctor/${doctor_id}`);
  }

  delete_patient(patient_id: string): Observable<Patient> {
    return this.http.delete<Patient>(`${this.apiUrl}/patients/${patient_id}`);
  }

}
