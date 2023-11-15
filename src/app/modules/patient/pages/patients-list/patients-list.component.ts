import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient, PatientOverview } from '../../interfaces/patient.interfaces';
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientComponent } from '../../components/add-patient/add-patient.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {
  public patients: PatientOverview[] = [];
  public userName: string = '';
  public isLoading: boolean = true;
  public options: string[] = ['Nombre (A-Z)', 'Nombre (Z-A)'];
  private doctor_id: string = '';
  public notFound: boolean = false;

  constructor(
    private patientService: PatientService,
    private credentialsService: CredentialsService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    ) { 
  }

  ngOnInit(): void {
    this.doctor_id = this.credentialsService.user_credentials._id;
    this.get_patients(this.doctor_id);
  }

  get_patients(doctor_id: string): void {
    this.patientService.getDrPatients(doctor_id).subscribe(
      (response) => {
        this.patients = response;
        this.isLoading = false;
      } , (error) => {
        this.isLoading = false;
        this.notFound = true;
      }
    );
  }

  get_fullname(patient: PatientOverview): string {
    return `${patient.name} ${patient.lastname}`;
  }

  seePatientProfile(patient_id: string): void {
    this.router.navigate([`/patients/patient-profile/${patient_id}`]);
  };

  addNote(patient_id: string): void {
    //falta agregar que abra el modal para la creacion de la nota
  }

  deletePatient(patient_id: string): void {
    this.patientService.deletePatient(patient_id, this.doctor_id)
    .subscribe({
      next: (patient) => {
        this.isLoading = true;
        this.get_patients(this.doctor_id);
        this.toastr.success("Paciente eliminado", "Éxito");
      },
      error: () => {
        this.toastr.error('No se pudo eliminar paciente', 'Error');
      },
    }
  );
  }

  searchPatient(term: string): void {
    this.isLoading = true;
    this.patientService.getDrPatients(this.doctor_id, term).subscribe(
      (response) => {
        this.patients = response;
        this.isLoading = false;
      }
    );
  }

  openAddPatient(): void {
    const doctorID = this.doctor_id;
    const dialogRef = this.dialog.open(AddPatientComponent, {
      disableClose: true,
      data: {doctorID ,patient: null}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.get_patients(this.doctor_id);
      }
    });
  }

}
