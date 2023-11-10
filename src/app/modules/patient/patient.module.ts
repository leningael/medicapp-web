import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsListComponent } from './pages/patients-list/patients-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientProfileComponent } from './pages/patient-profile/patient-profile.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClinicalHistoryComponent } from './pages/patient-profile/components/clinical-history/clinical-history.component';
import { NotesComponent } from './pages/patient-profile/components/notes/notes.component';
import { PersonalDataComponent } from './pages/patient-profile/components/personal-data/personal-data.component';
import { AddExistingPatientComponent } from './components/add-existing-patient/add-existing-patient.component';

@NgModule({
  declarations: [
    PatientsListComponent,
    PatientProfileComponent,
    AddPatientComponent,
    PersonalDataComponent,
    ClinicalHistoryComponent,
    NotesComponent,
    AddExistingPatientComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PatientRoutingModule,
    ReactiveFormsModule
  ]
})
export class PatientModule { }
