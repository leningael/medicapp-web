import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsListComponent } from './pages/patients-list/patients-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientProfileComponent } from './pages/patient-profile/patient-profile.component';
import { AddPatientComponent } from './pages/add-patient/add-patient.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PatientsListComponent,
    PatientProfileComponent,
    AddPatientComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PatientRoutingModule,
    ReactiveFormsModule
  ]
})
export class PatientModule { }
