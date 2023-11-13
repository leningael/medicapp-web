import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarService } from 'src/app/modules/calendar/services/calendar.service';
import { PatientService } from 'src/app/modules/patient/services/patient.service';
import { UserCredentials, UserData, useInformation } from 'src/app/shared/interfaces/credentials.interfaces';
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
  public isLoading: boolean = true;
  public userInformation: useInformation = {
    numberPatients: 0,
    numberAppointments: 0,
    numberReceptionists: 0,
  };

  constructor(
    private credentialService: CredentialsService,
    private patientService: PatientService,
    private calendarService: CalendarService,
    private dialog: MatDialog,
    private userService: UserService,
  ) {
    this.getUserData();
  }

  ngOnInit(): void {
    this.getMyPatients();
    this.getMyAppointments();
    this.getMyReceptionists();
  }

  getUserData(): void {
    this.user = this.credentialService.user_credentials;
    this.userRole = this.credentialService.role;
  }

  getMyPatients(): void {
    this.patientService.getDrPatients(this.user._id)
    .subscribe((patient) => {
      this.userInformation.numberPatients = patient.length;
    });
  }

  getMyAppointments(): void {
    this.calendarService.getActiveAppointments(this.user._id)
    .subscribe((appointments) => {
      this.userInformation.numberAppointments = appointments.length;
      this.isLoading = false;
    });
  }

  getMyReceptionists(): void {
   //Falta crear el servicio para obtener numberReceptionists
   this.userInformation.numberReceptionists = 0;
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

