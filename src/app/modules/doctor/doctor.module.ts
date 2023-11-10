import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsListComponent } from '../patient/pages/patients-list/patients-list.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule
  ]
})
export class DoctorModule { }
