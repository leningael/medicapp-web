import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarSlot, PatientInfo } from '../../models/calendar';
import { MatDialog } from '@angular/material/dialog';
import { CalendarService } from '../../services/calendar.service';
import { AddAppointmentDialogComponent } from '../add-appointment-dialog/add-appointment-dialog.component';
import { CredentialsService } from 'src/app/shared/services/credentials.service';

@Component({
  selector: 'appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css'],
})
export class AppointmentsListComponent {
  @Input() calendarSlots: CalendarSlot[] = [];
  @Input() doctorId: string = this.credentialsService.user_credentials._id;
  @Output() onChanges: EventEmitter<any> = new EventEmitter();

  constructor(
    private calendarService: CalendarService,
    private credentialsService: CredentialsService,
    private dialog: MatDialog
  ) {}

  addAppointment(slot:CalendarSlot) {
    const { start_datetime, end_datetime } = slot;
    const dialogRef = this.dialog.open(AddAppointmentDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        doctorId: this.doctorId,
        start_datetime,
        end_datetime,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.onChanges.emit();
    });
  }

  getCompleteName(patient: PatientInfo): string {
    return `${patient.name} ${patient.lastname}`;
  }
}
