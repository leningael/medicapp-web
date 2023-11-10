import { Component, Inject } from '@angular/core';
import { ReceptionistsService } from '../../services/receptionists.service';
import { SelectPersonArgs } from 'src/app/shared/interfaces/credentials.interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-receptionist-dialog',
  templateUrl: './add-receptionist-dialog.component.html',
  styleUrls: ['./add-receptionist-dialog.component.css'],
})
export class AddReceptionistDialogComponent {
  constructor(
    private receptionistsService: ReceptionistsService,
    private dialogRef: MatDialogRef<AddReceptionistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { doctorId: string }
  ) {}

  requestReceptionists(args: SelectPersonArgs) {
    
  }
}
