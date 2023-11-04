import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsListComponent } from './pages/patients-list/patients-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientProfileComponent } from './pages/patient-profile/patient-profile.component';

@NgModule({
  declarations: [
    PatientsListComponent,
    PatientProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
