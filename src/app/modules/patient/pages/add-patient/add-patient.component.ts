import { Component, Inject, inject } from '@angular/core';
import { PatientsListComponent } from '../patients-list/patients-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { PatientService } from '../../services/patient.service';

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
      @Inject(MAT_DIALOG_DATA) public doctorID: any
    ) { }


    onCancel(): void {
      this.dialogRef.close();
    }

    saveData(): void {
      this.newPatientForm.markAllAsTouched();
      if (this.newPatientForm.invalid) return;
      this.newPatientForm.value.birthdate = this.newPatientForm.value.birthdate.toISOString().slice(0,10);
      this.newPatientForm.get('doctors')!.patchValue([...this.newPatientForm.get('doctors')!.value, this.doctorID.doctor_id]);
      console.log(this.newPatientForm.value);
      this.patientService.addPatient(this.newPatientForm.value).subscribe(
        (response) => {
          this.dialogRef.close(response);
        }
      )
      
    }
}
