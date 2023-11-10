import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { PatientService } from 'src/app/modules/patient/services/patient.service';
import { SelectPersonArgs } from 'src/app/shared/interfaces/credentials.interfaces';
import { CredentialsService } from 'src/app/shared/services/credentials.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit{

  public patient_id: string;
  public note_id: string;
  private dialogRef: any;
  public isSaving: boolean = false;
  public doctor_id: string = '';
  public toggle: boolean = true;
  public selected_patient: string | undefined;

  constructor(private credentialsService: CredentialsService,
              private toastr: ToastrService,
              private patientsService: PatientService,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private dialogService: MatDialog){
              this.patient_id = '';
              this.note_id = '';
  }

  ngOnInit(): void {
    this.patient_id = this.data.patient_id || '';
    this.note_id = this.data.note_id || '';
    this.dialogRef = this.data.dialogRef;
  }

  closeDialog(){
    this.dialogRef.close();
  }

  selectPatient(id: string){
    this.patient_id = id;
    this.selected_patient = id;
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
}
