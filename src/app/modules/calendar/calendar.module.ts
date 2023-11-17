import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { SetBusinessHoursDialogComponent } from './components/set-business-hours-dialog/set-business-hours-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddAppointmentDialogComponent } from './components/add-appointment-dialog/add-appointment-dialog.component';



@NgModule({
  declarations: [
    CalendarPageComponent,
    AppointmentsListComponent,
    SetBusinessHoursDialogComponent,
    AddAppointmentDialogComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    AppointmentsListComponent
  ]
})
export class CalendarModule { }
