import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { PatientOverview } from 'src/app/modules/patient/interfaces/patient.interfaces';
import { PatientService } from 'src/app/modules/patient/services/patient.service';
import { SelectPersonArgs } from 'src/app/shared/interfaces/credentials.interfaces';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { AddMedicationComponent } from '../add-medication/add-medication.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meds, NoteContent, Notes } from '../../interfaces/notes';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent implements OnInit {
  public note_id: string;
  public isSaving: boolean = false;
  public doctor_id: string = '';
  public toggle: boolean = true;
  public selected_patient: PatientOverview;
  public form_data: FormGroup;
  public medication: Array<Meds>;
  public isLoading: boolean = true;

  constructor(
    private credentialsService: CredentialsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private patientsService: PatientService,
    private notesService: NotesService,
    private dialogRef: MatDialogRef<AddNoteComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { noteId: string; patient?: any; appointment_id?: string },
    private dialogService: MatDialog
  ) {
    this.note_id = data.noteId;
    this.form_data = this.fb.group({
      reason: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      sistolic_pressure: this.fb.control(''),
      diagnosis: this.fb.control('', [Validators.required]),
      temperature: this.fb.control(''),
      weight: this.fb.control(''),
      height: this.fb.control(''),
      imc: this.fb.control(0, [Validators.required]),
      diastolic_pressure: this.fb.control(''),
    });
    this.medication = [];
    this.selected_patient = {
      _id: '',
      name: '',
      lastname: '',
      curp: '',
    };
  }
  ngOnInit(): void {
    if (this.note_id) {
      this.notesService.getDetails(this.note_id).subscribe({
        next: (res): void => {
          this.initializeFormData(res);
        },
      });
    } else if (this.data.appointment_id) {
      this.notesService.getAppointmentNote(this.data.appointment_id).subscribe({
        next: (res) => {
          this.initializeFormData(res);
        },
        error: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
    if (this.data.patient) {
      this.selected_patient = {
        _id: this.data.patient._id || '',
        name: this.data.patient.name || '',
        lastname: this.data.patient.lastname || '',
        curp: this.data.patient.curp || '',
      };
      this.toggle = false;
    }
  }
  private initializeFormData(res: NoteContent) {
    this.isLoading = true;
    this.form_data = this.fb.group({
      reason: this.fb.control(res.reason || '', [Validators.required]),
      description: this.fb.control(res.diagnosis || ''),
      sistolic_pressure: this.fb.control(res.sistolic_pressure || ''),
      diagnosis: this.fb.control(res.diagnosis || '', [Validators.required]),
      temperature: this.fb.control(res.temperature || ''),
      weight: this.fb.control(res.weight || ''),
      height: this.fb.control(res.height || ''),
      imc: this.fb.control(res.imc ?? 0, Validators.required),
      diastolic_pressure: this.fb.control(res.diastolic_pressure ?? ''),
    });
    this.medication = res.medication;
    this.isLoading = false;
  }
  selectPatient(patient: PatientOverview) {
    this.selected_patient = patient;
    this.toggle = false;
  }
  closeDialog(save?: boolean) {
    if (save === false) {
      this.dialogRef.close(save);
      return;
    }
    let note: Notes = {
      content: { ...this.form_data.value, medication: this.medication },
      patient: this.selected_patient,
      doctor_name: this.credentialsService.user_credentials.name,
      date: '' + Date.now(),
      appointment_id: this.data.appointment_id,
    };
    if (this.note_id) note._id = this.note_id;
    this.dialogRef.close(note);
  }
  requestPatients(args: SelectPersonArgs) {
    this.doctor_id = this.credentialsService.user_credentials._id;
    return this.patientsService.getDrPatients(this.doctor_id, args.search).pipe(
      catchError((err) => {
        if (err.status !== 404)
          this.toastr.error(
            'No se encontraron pacientes coincidentes',
            'Error'
          );
        return of([]);
      })
    );
  }
  handleAddMedication() {
    const dialogRef = this.dialogService.open(AddMedicationComponent, {
      data: {
        meds: this.medication,
      },
      width: '80vw',
      height: '60vh',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!Array.isArray(result)) return;
      if (result === this.medication) return;
      this.medication = result;
    });
  }
}
