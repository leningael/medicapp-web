import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../interfaces/patient.interfaces';
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientComponent } from '../add-patient/add-patient.component';

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
    public dialog: MatDialog,
    ) { 
  }

  ngOnInit(): void {
    this.doctor_id = this.credentialsService.user_credentials._id;
    this.get_patients(this.doctor_id);
  }

  get_patients(doctor_id: string): void {
    this.patientService.getDrPatients(doctor_id).subscribe(
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
  }

  deletePatient(patient_id: string): void {
    this.patientService.deletePatient(patient_id).subscribe(
      (response: Patient) => {
        this.isLoading = true;
        this.get_patients(this.doctor_id);
      }
    );
  }

  searchPatient(term: string): void {
    this.isLoading = true;
    this.patientService.getDrPatients(term, this.doctor_id).subscribe(
      (response: Patient[]) => {
        this.patients = response;
        this.isLoading = false;
      }
    );
  }

  openAddPatient(): void {
    const dialogRef = this.dialog.open(AddPatientComponent, {
      height: '550px',
      
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.get_patients(this.doctor_id);
      }
    });
  }

}
