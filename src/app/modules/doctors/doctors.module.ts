import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsPageComponent } from './pages/doctors-page/doctors-page.component';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { CalendarModule } from '../calendar/calendar.module';
import { PatientModule } from '../patient/patient.module';



@NgModule({
  declarations: [
    DoctorsPageComponent,
    AddAppointmentComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    SharedModule,
    CalendarModule,
    PatientModule
  ]
})
export class DoctorsModule { }
