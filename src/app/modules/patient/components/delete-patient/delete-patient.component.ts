import { Component } from '@angular/core';
import { PatientsListComponent } from '../../pages/patients-list/patients-list.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-patient',
  templateUrl: './delete-patient.component.html',
  styleUrls: ['./delete-patient.component.css']
})
export class DeletePatientComponent {
  constructor(
    public dialogRef: MatDialogRef<PatientsListComponent>,
  ) { }

  onDelete(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
