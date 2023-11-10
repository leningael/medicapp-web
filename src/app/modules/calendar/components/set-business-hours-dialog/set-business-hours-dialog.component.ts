import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BusinessHours } from 'src/app/modules/doctor/interfaces/doctor.interfaces';
import { CalendarService } from '../../services/calendar.service';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-set-business-hours-dialog',
  templateUrl: './set-business-hours-dialog.component.html',
  styleUrls: ['./set-business-hours-dialog.component.css']
})
export class SetBusinessHoursDialogComponent {
  isSaving: boolean = false;
  businessHoursForm:FormGroup = this.formBuilder.group({
    start_time: [this.businessHours.start_time || '', Validators.required],
    end_time: [this.businessHours.end_time || '', Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private calendarService: CalendarService,
    private credentialsService: CredentialsService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<SetBusinessHoursDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public businessHours: BusinessHours
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  saveBusinessHours() {
    this.isSaving = true;
    const doctorId: string = this.credentialsService.user_credentials._id;
    this.calendarService.setDrBusinnessHours(doctorId, this.businessHoursForm.value)
    .subscribe({
      next: () => {
        this.toastr.success('Horario guardado', 'Éxito');
        this.dialogRef.close(this.businessHoursForm.value);
        this.isSaving = false;
      },
      error: () => {
        this.toastr.error('No se pudo guardar el horario', 'Error');
        this.isSaving = false;
      }
    })
  }
}
