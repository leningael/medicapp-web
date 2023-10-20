import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
  public title = '';
  public message = 'Are you sure?';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public args: { title: string; message: string}
  ) {
    this.title = args.title;
    this.message = args.message;
  }

  /**
   * Accept
   */
  accept() {
    this.dialogRef.close(true);
  }

  /**
   * Cancel
   */
  cancel() {
    this.dialogRef.close(null);
  }
}
