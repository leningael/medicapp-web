import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Patient } from 'src/app/modules/patient/interfaces/patient.interfaces';
import { PatientService } from 'src/app/modules/patient/services/patient.service';
import { SelectPersonArgs } from 'src/app/shared/interfaces/credentials.interfaces';
import { CredentialsService } from 'src/app/shared/services/credentials.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit{
  public note_id: string;
  public isSaving: boolean = false;
  public doctor_id: string = '';
  public toggle: boolean = true;
  public selected_patient: Patient | undefined;

  constructor(private credentialsService: CredentialsService,
              private toastr: ToastrService,
              private patientsService: PatientService,
              private dialogRef: MatDialogRef<AddNoteComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private dialogService: MatDialog){
              this.note_id = '';
  }

  ngOnInit(): void {
    this.selected_patient = this.data.patient;
    this.note_id = this.data.note_id || '';
  }

  selectPatient(patient: Patient){
    console.log(patient);
    this.selected_patient = patient;
  }

  closeDialog(){
    this.dialogRef.close();
  }

  requestPatients(args: SelectPersonArgs){
    this.doctor_id = this.credentialsService.user_credentials._id;
    return this.patientsService.getAllExistingPatients(this.doctor_id, args.search)
    .pipe(
      catchError((err) => {
        if(err.status !== 404)
          this.toastr.error("No se encontraron pacientes coincidentes", "Error");
        return of([]);
      }
    ));
  }
  
  handleAddMedication() {
    throw new Error('Method not implemented.');
    }
}
