import { Component, Inject } from '@angular/core';
import { ReceptionistsService } from '../../services/receptionists.service';
import { SelectPersonArgs } from 'src/app/shared/interfaces/credentials.interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReceptionistOverview } from '../../interfaces/receptionists.interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-receptionist-dialog',
  templateUrl: './add-receptionist-dialog.component.html',
  styleUrls: ['./add-receptionist-dialog.component.css'],
})
export class AddReceptionistDialogComponent {
  isSaving: boolean = false;

  constructor(
    private receptionistsService: ReceptionistsService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddReceptionistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { doctorId: string }
  ) {}

  requestReceptionists(args: SelectPersonArgs) {
    return this.receptionistsService.getAllReceptionists(this.data.doctorId, args.search);
  }

  onSelectReceptionist(receptionist: ReceptionistOverview) {
    this.saveReceptionist(receptionist._id);
  }

  saveReceptionist(receptionist_id: string) {
    this.isSaving = true;
    this.receptionistsService.assignDoctor(receptionist_id, this.data.doctorId)
    .subscribe({
      next: () => {
        this.dialogRef.close(true);
        this.isSaving = false;
      },
      error: () => {
        this.toastr.error("Error al asignar recepcionista", "Error");
        this.isSaving = false;
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
