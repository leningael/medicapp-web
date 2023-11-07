import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from '../../services/calendar.service';
import { PatientService } from 'src/app/modules/patient/services/patient.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppointmentForm, CreateAppointmentArgs } from '../../models/calendar';
import { format } from 'date-fns';
import { SelectPersonArgs } from 'src/app/shared/interfaces/credentials.interfaces';

@Component({
  selector: 'app-add-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.css']
})
export class AddAppointmentDialogComponent {
  isSaving: boolean = false;
  appointmentForm:FormGroup<AppointmentForm> = this.formBuilder.nonNullable.group({
    doctor_id: [this.data.doctorId || '', Validators.required],
    patient_id: ['', Validators.required],
    cause: ['', Validators.required],
    start_datetime: [this.data.start_datetime || '', Validators.required],
    end_datetime: [this.data.end_datetime || '', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private calendarService: CalendarService,
    private patientsService: PatientService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {doctorId:string, start_datetime: Date, end_datetime: Date},
  ) { }

  requestPatients(){
    return this.patientsService.get_patients()
    .pipe(
      catchError((err) => {
        this.toastr.error("Error al cargar pacientes", "Error");
        return [];
      }
    ));
  }

  onSelectPatient(patient: any){
    this.appointmentForm.controls['patient_id'].setValue(patient._id);
    this.saveAppointment();
  }

  saveAppointment(){    
    if(this.appointmentForm.invalid){
      this.appointmentForm.markAllAsTouched();
      return;
    }
    const newAppointment: CreateAppointmentArgs = {
      ...this.appointmentForm.getRawValue(),
      start_datetime: format(this.appointmentForm.value.start_datetime!, 'yyyy-MM-dd HH:mm'),
      end_datetime: format(this.appointmentForm.value.end_datetime!, 'yyyy-MM-dd HH:mm'),
    }
    this.isSaving = true;
    this.calendarService.createAppointment(newAppointment)
    .subscribe({
      next: () => {
        this.toastr.success('La cita se creó correctamente', 'Éxito');
        this.isSaving = false;
        this.dialogRef.close(true);
      },
      error: () => {
        this.toastr.error('No se pudo crear la cita', 'Error');
        this.isSaving = false;
      }
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
