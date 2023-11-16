import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsPageComponent } from './pages/doctors-page/doctors-page.component';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';



@NgModule({
  declarations: [
    DoctorsPageComponent,
    AddAppointmentComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    SharedModule
  ]
})
export class DoctorsModule { }
