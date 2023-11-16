import { Component, OnInit } from '@angular/core';
import { DoctorOverview } from '../../interfaces/doctors.interfaces';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { DoctorsService } from '../../services/doctors.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddAppointmentComponent } from '../../components/add-appointment/add-appointment.component';

@Component({
  selector: 'app-doctors-page',
  templateUrl: './doctors-page.component.html',
  styleUrls: ['./doctors-page.component.css'],
})
export class DoctorsPageComponent implements OnInit {
  doctors: DoctorOverview[] = [];
  doctorsToSearch: string = '';
  receptionistId: string = this.credentialsService.user_credentials._id;
  isLoading: boolean = false;

  constructor(
    private credentialsService: CredentialsService,
    private doctorsService: DoctorsService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.requestDoctors();
  }

  requestDoctors() {
    this.isLoading = true;
    this.doctorsService
      .getReceptionistDoctors(this.receptionistId, this.doctorsToSearch)
      .subscribe({
        next: (doctors) => {
          this.doctors = doctors;
          this.isLoading = false;
        },
        error: () => {
          this.toastr.error('Error al cargar la lista de doctores', 'Error');
          this.doctors = [];
          this.isLoading = false;
        },
      });
  }

  searchReceptionists(search: string) {
    this.doctorsToSearch = search;
    this.requestDoctors();
  }

  addAppointment(doctor: DoctorOverview) {
    this.dialog.open(AddAppointmentComponent, {
      width: '400px',
      height: '500px',
      data: doctor,
    });
  }
}
