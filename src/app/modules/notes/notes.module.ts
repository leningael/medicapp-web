import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { NotesRoutingModule } from './notes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { AddMedicationComponent } from './components/add-medication/add-medication.component';



@NgModule({
  declarations: [
    NotesPageComponent,
    AddNoteComponent,
    AddMedicationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NotesRoutingModule
  ],
})
export class NotesModule { }
