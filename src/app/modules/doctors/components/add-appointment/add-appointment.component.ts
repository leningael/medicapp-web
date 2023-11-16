import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DoctorOverview } from '../../interfaces/doctors.interfaces';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent {
  selectedDate: Date = startOfDay(new Date());
  constructor(
    private dialogRef: MatDialogRef<AddAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public doctor: DoctorOverview,
  ) { }
}
