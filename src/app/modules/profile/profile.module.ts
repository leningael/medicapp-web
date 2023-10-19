import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileRoutingModule } from './profile-routing.module';



@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
