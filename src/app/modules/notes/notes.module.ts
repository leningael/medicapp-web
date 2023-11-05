import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { NotesRoutingModule } from './notes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    NotesPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NotesRoutingModule
  ],
})
export class NotesModule { }
