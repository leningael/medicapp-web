import { Component } from '@angular/core';
import { PatientsListComponent } from '../patients-list/patients-list.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {
    public newPatientForm: FormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],

    })
    constructor(
      public dialogRef: MatDialogRef<PatientsListComponent>,
      private formBuilder: FormBuilder,
    ) { }

    onCancel(): void {
      this.dialogRef.close();
    }

    saveData(): void {
      //falta agregar la logica para guardar la nota
    }
}
