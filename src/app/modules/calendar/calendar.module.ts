import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';



@NgModule({
  declarations: [
    CalendarPageComponent,
    AppointmentsListComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule
  ]
})
export class CalendarModule { }
