import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient, PatientOverview } from '../../interfaces/patient.interfaces';
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientComponent } from '../../components/add-patient/add-patient.component';
import { ToastrService } from 'ngx-toastr';
import { NotesService } from 'src/app/modules/notes/services/notes.service';
import { AddNoteComponent } from 'src/app/modules/notes/components/add-note/add-note.component';
import { DeletePatientComponent } from '../../components/delete-patient/delete-patient.component';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css'],
})
export class PatientsListComponent implements OnInit {
  public patients: PatientOverview[] = [];
  public userName: string = '';
  public isLoading: boolean = false;
  private doctor_id: string = this.credentialsService.user_credentials._id;
  public notFound: boolean = false;

  constructor(
    private patientService: PatientService,
    private credentialsService: CredentialsService,
    private notesService: NotesService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

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

  addNote(patient: PatientOverview): void {
    const dialogRef = this.dialog.open(AddNoteComponent, {
      data: { patient },
      width: '90vw',
      height: '90vh',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      if (!result._id)
        this.notesService.postNote(result).subscribe(() => this.succesUpload());
      else
        this.notesService
          .updateNote(result)
          .subscribe(() => this.succesUpload());
    });
  }
  private succesUpload(): void {
    this.toastr.success('Nota agregadada correctamente', 'Éxito');
  }

  deletePatientAlert(patient_id: string): void {
    const dialogRef = this.dialog.open(DeletePatientComponent, {
      width: '300px',
      hasBackdrop: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePatient(patient_id);
      }
    });
  }

  deletePatient(patient_id: string): void {
    this.patientService.deletePatient(patient_id, this.doctor_id).subscribe({
      next: (patient) => {
        this.get_patients();
        this.toastr.success('Paciente eliminado', 'Éxito');
      },
      error: () => {
        this.toastr.error('No se pudo eliminar paciente', 'Error');
      },
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
