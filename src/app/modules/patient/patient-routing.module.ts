import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsListComponent } from './pages/patients-list/patients-list.component';
import { PatientProfileComponent } from './pages/patient-profile/patient-profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'patients-list',
        component: PatientsListComponent,
        data: { title: 'Mis pacientes' }
      },
      {
        path: 'patient-profile/:id',
        component: PatientProfileComponent,
        pathMatch:'full',
        data: { title: 'Información del paciente' }
      },
      {
        path: '**',
        redirectTo: 'patients-list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }