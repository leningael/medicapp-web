import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient, PatientOverview } from '../../interfaces/patient.interfaces';
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientComponent } from '../../components/add-patient/add-patient.component';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css'],
})
export class PatientsListComponent implements OnInit {
  public patients: PatientOverview[] = [];
  public userName: string = '';
  public isLoading: boolean = false;
  public options: string[] = ['Nombre (A-Z)', 'Nombre (Z-A)'];
  private doctor_id: string = '';
  public notFound: boolean = false;

  constructor(
    private patientService: PatientService,
    private credentialsService: CredentialsService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.doctor_id = this.credentialsService.user_credentials._id;
  }

  ngOnInit(): void {
    this.get_patients();
  }

  get_patients(): void {
    this.isLoading = true;
    this.patientService.getDrPatients(this.doctor_id).subscribe({
      next: (patients) => {
        this.patients = patients;
        this.isLoading = false;
      },
      error: () => {
        this.patients = [];
        this.isLoading = false;
      },
    });
  }

  get_fullname(patient: PatientOverview): string {
    return `${patient.name} ${patient.lastname}`;
  }

  seePatientProfile(patient_id: string): void {
    this.router.navigate([`/patients/patient-profile/${patient_id}`]);
  }

  addNote(patient_id: string): void {
    //falta agregar que abra el modal para la creacion de la nota
  }

  deletePatient(patient_id: string): void {
    this.patientService.deletePatient(patient_id).subscribe(() => {
      this.get_patients();
    });
  }

  searchPatient(term: string): void {
    this.isLoading = true;
    this.patientService
      .getDrPatients(this.doctor_id, term)
      .subscribe((response) => {
        this.patients = response;
        this.isLoading = false;
      });
  }

  openAddPatient(): void {
    const doctorID = this.doctor_id;
    const dialogRef = this.dialog.open(AddPatientComponent, {
      disableClose: true,
      data: { doctorID, patient: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.get_patients();
      }
    });
  }
}
