import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'receptionists-list',
        // component
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
  imports: [],
  exports: [],
})
export class ReceptionistsRoutingModule { }
