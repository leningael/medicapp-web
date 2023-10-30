import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../interfaces/patient.interfaces';
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/shared/services/credentials.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {
  public patients: Patient[] = [];
  public userName: string = '';
  public isLoading: boolean = true;
  public options: string[] = ['Nombre (A-Z)', 'Nombre (Z-A)'];
  private doctor_id: string = '';

  constructor(
    private patientService: PatientService,
    private credentialsService: CredentialsService,
    private router: Router,
    ) { 
  }

  ngOnInit(): void {
    this.doctor_id = this.credentialsService.user_credentials.id;
    this.get_patients(this.doctor_id);
  }

  get_patients(doctor_id: string): void {
    this.patientService.get_my_patients(doctor_id).subscribe(
      (response: Patient[]) => {
        this.patients = response;
        this.isLoading = false;
      }
    );
  }

  get_fullname(patient: Patient): string {
    return `${patient.name} ${patient.lastname}`;
  }

  seePatientProfile(patient_id: string): void {
    this.router.navigate([`/patients/patient-profile/${patient_id}`]);
  };

  addNote(patient_id: string): void {
    //falta agregar que abra el modal para la creacion de la nota
    console.log('abre modal de nota');
  }

  deletePatient(patient_id: string): void {
    this.patientService.delete_patient(patient_id).subscribe(
      (response: Patient) => {
        this.isLoading = true;
        this.get_patients(this.doctor_id);
      }
    );
  }

  searchPatient(term: string): void {
    
  }

}
