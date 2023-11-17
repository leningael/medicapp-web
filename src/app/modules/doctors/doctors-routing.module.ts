import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsPageComponent } from './pages/doctors-page/doctors-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'doctors-list',
        component: DoctorsPageComponent,
        data: { title: 'Lista de doctores' },
      },
      {
        path: '**',
        redirectTo: 'doctors-list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule { }
