import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Appointment, PatientAppointment } from 'src/app/modules/calendar/models/calendar';
import { AddPatientComponent } from 'src/app/modules/patient/components/add-patient/add-patient.component';
import { Patient } from 'src/app/modules/patient/interfaces/patient.interfaces';
import { PatientService } from 'src/app/modules/patient/services/patient.service';
import { CredentialsService } from 'src/app/shared/services/credentials.service';

@Component({
  selector: 'personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit{
  @ViewChild('paginator') paginator!: MatPaginator;
  @Input() patient!: Patient;
  public appointments: PatientAppointment[] = [];
  doctor_id: string = '';
  isLoading: boolean = true;
  isAppointmentsLoading: boolean = true;
  public notFound: boolean = false;

  constructor(
    private patientService: PatientService,
    private credentialsService: CredentialsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.doctor_id = this.credentialsService.user_credentials._id;
    this.getPatientAppointments();
  }

  getPatientAppointments(): void {
    this.patientService.getPatientAppointments(this.doctor_id, this.patient._id!) 
    .subscribe(
      (appointments) => {
        this.appointments = appointments;
        this.isLoading = false;
      },
      (error) => {
        this.notFound = true;
        this.isLoading = false;
      }
    )
  }

  getUpdatedPatient(): void {
    this.patientService.getPatient(this.patient._id!).subscribe(
      (patient: Patient) => {
        this.patient = patient;
        this.isLoading = false;
      }
    )
  }

  openEditPatient(): void {
    const doctorID = this.doctor_id;
    const dialogRef = this.dialog.open(AddPatientComponent, {
      disableClose: true,
      data: {doctorID, patient: this.patient}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.getUpdatedPatient();
      }
    });
  }
  
}
