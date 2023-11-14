import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Patient } from 'src/app/modules/patient/interfaces/patient.interfaces';
import { PatientService } from 'src/app/modules/patient/services/patient.service';
import { SelectPersonArgs } from 'src/app/shared/interfaces/credentials.interfaces';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { AddMedicationComponent } from '../add-medication/add-medication.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Meds, Notes } from '../../interfaces/notes';

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
  public form_data: FormGroup;
  public medication: Array<Meds>;

  constructor(
    private credentialsService: CredentialsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private patientsService: PatientService,
    private dialogRef: MatDialogRef<AddNoteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogService: MatDialog){
              this.note_id = '';
              this.form_data = this.fb.group({
                reason: this.fb.control(''),
                description: this.fb.control(''),
                sistolic_pressure: this.fb.control(''),
                diagnosis: this.fb.control(''),
                temperature: this.fb.control(''),
                weight: this.fb.control(''),
                height: this.fb.control(''),
                imc: this.fb.control(''),
                diastolic_pressure: this.fb.control(this.data.diastolic_pressure ?? ''),
              })
              this.medication = [];
  }

  ngOnInit(): void {
    this.selected_patient = this.data.patient;
    this.note_id = this.data.note_id || '';
    this.form_data = this.fb.group({
      reason: this.fb.control(''),
      description: this.fb.control(''),
      sistolic_pressure: this.fb.control(''),
      diagnosis: this.fb.control(''),
      temperature: this.fb.control(''),
      weight: this.fb.control(''),
      height: this.fb.control(''),
      imc: this.fb.control(''),
      diastolic_pressure: this.fb.control(this.data.diastolic_pressure ?? ''),
    })

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
    const dialogRef = this.dialogService.open(AddMedicationComponent,{
      data: {
        meds: this.medication
      },
      width: '80vw',
      height: '60vh',
      hasBackdrop: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!Array.isArray(result)) return;
      if(result === this.medication) return;
      this.medication = result;
    });
    }
}
