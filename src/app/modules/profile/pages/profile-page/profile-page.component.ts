import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserCredentials, UserData, userInformation } from 'src/app/shared/interfaces/credentials.interfaces';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { EditProfileComponent } from '../../components/edit-profile/edit-profile.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit{
  public user!: UserData;
  public userRole!: string;
  public isLoading: boolean = false;
  public userInformation: userInformation = {
    numberPatients: 0,
    numberAppointments: 0,
    numberReceptionists: 0,
    numberDoctors: 0,
  };

  constructor(
    private credentialService: CredentialsService,
    private dialog: MatDialog,
    private userService: UserService,
  ) {
    this.getUserData();
  }

  ngOnInit(): void {
    this.getUserinformation();
  }

  getUserData(): void {
    this.user = this.credentialService.user_credentials;
    this.userRole = this.credentialService.role;
  }

  getUserinformation(): void {
    this.isLoading = true;
    this.userService.getUserInformation(this.user._id)
      .subscribe(
        (userInformation) => {
        this.userInformation = userInformation;
        this.isLoading = false;
    });
  }

  setNewCredentials(user: UserData): void {
    const credentials: UserCredentials = {
      token: this.credentialService.token,
      user_credentials: user,
      role: this.credentialService.role,
    }
    this.credentialService.setCredentials(credentials);
  }

  openEditProfile(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {  
      width: '400px',
      data: this.user,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.userService.getUser(this.user._id)
        .subscribe(
          (user) => {
            this.user = user;
            this.setNewCredentials(user);
            this.isLoading = false;
        })
      }
    });
  }

}

