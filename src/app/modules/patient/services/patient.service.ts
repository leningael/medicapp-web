import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClinicalHistory, Patient, PatientOverview } from '../interfaces/patient.interfaces';
import { environment } from 'src/environments/environment';
import { Appointment, PatientAppointment } from '../../calendar/models/calendar';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient,
  ) {}
  
  getAllExistingPatients(doctor_id?: string, search?: string): Observable<PatientOverview[]> {
    let params = new HttpParams();
    if (doctor_id) params = params.append('doctor_id', doctor_id);
    if (search) params = params.append('search', search);
    return this.http.get<PatientOverview[]>(`${this.apiUrl}/patients`, {params} );
  }

  getDrPatients(doctor_id: string, search?: string): Observable<PatientOverview[]> {
    let params = new HttpParams();
    if (search) params = params.append('search', search);
    return this.http.get<PatientOverview[]>(`${this.apiUrl}/patients/doctor/${doctor_id}`, {params} );
  }

  getPatient(patient_id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patients/${patient_id}`);
  }

  getPatientAppointments(doctor_id: string, patient_id: string): Observable<PatientAppointment[]> {
    return this.http.get<PatientAppointment[]>(`${this.apiUrl}/calendar/get_patient_appointments/${doctor_id}/${patient_id}`);
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, patient);
  }

  addDoctorToPatient(patient_id: string, doctor_id: string): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/patients/linkExistingPatient`, {patient_id, doctor_id});
  }

  updatePatient(patient_id: string, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/patients/${patient_id}`, patient);
  }

  updatePatientClinicalHistory(patient_id: string, clinicalHistory: ClinicalHistory): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/patients/${patient_id}/clinicalHistory`, clinicalHistory);
  }

  deletePatient(patient_id: string, doctor_id: string): Observable<Patient> {
    return this.http.delete<Patient>(`${this.apiUrl}/patients/${patient_id}/deleteDoctor/${doctor_id}`);
  }

}
