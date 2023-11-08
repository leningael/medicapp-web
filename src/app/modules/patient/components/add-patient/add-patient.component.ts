import { Component, Inject, inject } from '@angular/core';
import { PatientsListComponent } from '../../pages/patients-list/patients-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../interfaces/patient.interfaces';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {
    public newPatientForm: FormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      curp: ['', Validators.required],
      birthdate: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern),
      ],],
      address: ['', Validators.required],
      zipcode: ['', Validators.required],
      bloodtype: ['', Validators.required],
      doctors: [[]],
    })
    constructor(
      public dialogRef: MatDialogRef<PatientsListComponent>,
      private formBuilder: FormBuilder,
      private validatorService: ValidatorsService,
      private patientService: PatientService,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
      if (this.data.patient) {
        this.loadForm(this.data.patient);
      } 
      
    }


    loadForm(patient: Patient): void {
      this.newPatientForm.reset({
        name: patient.name,
        lastname: patient.lastname,
        gender: patient.gender,
        curp: patient.curp,
        birthdate: new Date(patient.birthdate),
        phone: patient.phone,
        email: patient.email,
        address: patient.address,
        zipcode: patient.zipcode,
        bloodtype: patient.bloodtype,
        doctors: patient.doctors,
      });
    }
    
    onCancel(): void {
      this.dialogRef.close();
    }

    updatePatient(): void {
      this.patientService.updatePatient(this.data.patient._id, this.newPatientForm.value).subscribe(
        (response) => {
          this.dialogRef.close(response);
      })
    }

    addPatient(): void {
      this.patientService.addPatient(this.newPatientForm.value).subscribe(
        (response) => {
          this.dialogRef.close(response);
        }
      )
    }

    saveData(): void {
      this.newPatientForm.markAllAsTouched();
      if (this.newPatientForm.invalid) return;
      this.newPatientForm.value.birthdate = this.newPatientForm.value.birthdate.toISOString();
      if (this.data.patient) {
        this.updatePatient()
      }else {
        this.newPatientForm.get('doctors')!.patchValue([...this.newPatientForm.get('doctors')!.value, this.data.doctorID])
        this.addPatient()  
      }
      
      
    }
}
