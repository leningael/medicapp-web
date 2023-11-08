import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsListComponent } from './pages/patients-list/patients-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientProfileComponent } from './pages/patient-profile/patient-profile.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClinicalHIstoryComponent } from './pages/patient-profile/components/clinical-history/clinical-history.component';
import { NotesComponent } from './pages/patient-profile/components/notes/notes.component';
import { PersonalDataComponent } from './pages/patient-profile/components/personal-data/personal-data.component';

@NgModule({
  declarations: [
    PatientsListComponent,
    PatientProfileComponent,
    AddPatientComponent,
    PersonalDataComponent,
    ClinicalHIstoryComponent,
    NotesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PatientRoutingModule,
    ReactiveFormsModule
  ]
})
export class PatientModule { }
