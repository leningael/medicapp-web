import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from '../../services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../interfaces/patient.interfaces';
import { is, th } from 'date-fns/locale';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit{
  isLoading: boolean = false;
  patiendId: string = '';
  public patient!: Patient;

  constructor(
    public dialog : MatDialog,
    private patientService: PatientService,
    private route: ActivatedRoute,
  ) { 
    this.patiendId = route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.getPatient(); 
  }

  getPatient(): void {
    this.isLoading = true;
    this.patientService.getPatient(this.patiendId.toString()).subscribe(
      (patient: Patient) => {
        this.patient = patient;
        this.isLoading = false;
      }
    )
  }  
}
