import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'notes-list',
        component: NotesPageComponent,
        data: { title: 'Visualizar Notas' }
      },
      {
        path: '**',
        redirectTo: 'notes-list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
