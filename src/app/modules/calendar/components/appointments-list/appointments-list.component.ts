import { Component, Input } from '@angular/core';
import { CalendarSlot, PatientInfo } from '../../models/calendar';

@Component({
  selector: 'appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent {
  @Input() calendarSlots: CalendarSlot[] = [];

  getCompleteName(patient:PatientInfo): string {
    return `${patient.name} ${patient.lastname}`;
  }
}
