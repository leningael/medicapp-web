import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceptionistsPageComponent } from './pages/receptionists-page/receptionists-page.component';
import { ReceptionistsRoutingModule } from './receptionists-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReceptionistsPageComponent
  ],
  imports: [
    CommonModule,
    ReceptionistsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ReceptionistsModule { }
