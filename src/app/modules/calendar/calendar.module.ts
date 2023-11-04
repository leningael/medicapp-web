import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { SetBusinessHoursDialogComponent } from './components/set-business-hours-dialog/set-business-hours-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CalendarPageComponent,
    AppointmentsListComponent,
    SetBusinessHoursDialogComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CalendarModule { }
