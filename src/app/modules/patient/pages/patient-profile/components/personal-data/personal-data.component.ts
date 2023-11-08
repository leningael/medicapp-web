import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { is } from 'date-fns/locale';
import { Appointment } from 'src/app/modules/calendar/models/calendar';
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
  public appointments: Appointment[] = [];
  doctor_id: string = '';
  isLoading: boolean = true;

  constructor(
    private patientService: PatientService,
    private credentialsService: CredentialsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getPatientAppointments();
    this.doctor_id = this.credentialsService.user_credentials._id;
    this.isLoading = false;
  }

  getPatientAppointments(): void {
    // AQUÍ LLAMARÍA AL SERVICIO PARA TENER LAS CITAS
    // this.patientService.getPatientAppointments(this.patient._id!).subscribe(
    //   (appointments: Appointment[]) => {
    //     this.appointments = appointments;
    //   }
    // )

    //POR MIENTRAS:
    this.appointments = [
      {
        _id: 'string',
        cause: 'Dolor de cabeza',
        start_datetime: '2024-10-22T12:00:00.000+00:00',
        end_datetime: '2024-10-22T13:00:00.000+00:00',
        patient: {
          _id: 'string',
          name: 'string',
          lastname: 'string',
          email: 'string',
        },
      },
      {
        _id: 'string',
        cause: 'Radiografía de muñeca',
        start_datetime: '2023-10-22T08:00:00.000+00:00',
        end_datetime: '2023-10-22T09:00:00.000+00:00',
        patient: {
          _id: 'string',
          name: 'string',
          lastname: 'string',
          email: 'string',
        },
      },
      {
        _id: 'string',
        cause: 'Análisis de sangre',
        start_datetime: '2023-11-05T08:00:00.000+00:00',
        end_datetime: '2023-11-05T09:00:00.000+00:00',
        patient: {
          _id: 'string',
          name: 'string',
          lastname: 'string',
          email: 'string',
        },
      },
      {
        _id: 'string',
        cause: 'Análisis de sangre',
        start_datetime: '2023-11-05T08:00:00.000+00:00',
        end_datetime: '2023-11-05T09:00:00.000+00:00',
        patient: {
          _id: 'string',
          name: 'string',
          lastname: 'string',
          email: 'string',
        },
      },
      {
        _id: 'string',
        cause: 'Análisis de sangre',
        start_datetime: '2023-11-05T08:00:00.000+00:00',
        end_datetime: '2023-11-05T09:00:00.000+00:00',
        patient: {
          _id: 'string',
          name: 'string',
          lastname: 'string',
          email: 'string',
        },
      }
    ]
  }

  isAppointmentPassed(appointmentStart: string): boolean {
    var appointmentDate = new Date(appointmentStart)
    var currentDste = new Date()
    if (appointmentDate < currentDste) {
      return true
    }
    return false
  }
  

  getPatient(): void {
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
        this.getPatient();
      }
    });
  }
  
}
