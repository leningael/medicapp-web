import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionistsPageComponent } from './pages/receptionists-page/receptionists-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'receptionists-list',
        component: ReceptionistsPageComponent,
        data: { title: 'Lista de recepcionistas' },
      },
      {
        path: '**',
        redirectTo: 'receptionists-list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionistsRoutingModule { }
