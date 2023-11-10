import { Component } from '@angular/core';
import { UserCredentials, UserData } from 'src/app/shared/interfaces/credentials.interfaces';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
  public user!: UserData;
  public isLoading: boolean = true;

  constructor(
    // private userCredencials: UserCredentials
  ) {}

  getUserData(): void {
    
  }

  openEditProfile(): void {}

}

