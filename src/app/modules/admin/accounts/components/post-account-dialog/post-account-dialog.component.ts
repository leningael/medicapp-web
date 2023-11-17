import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../../services/accounts.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { AccountOverview } from '../../interfaces/accounts.interfaces';

@Component({
  selector: 'app-post-account-dialog',
  templateUrl: './post-account-dialog.component.html',
  styleUrls: ['./post-account-dialog.component.css'],
})
export class PostAccountDialogComponent {
  isSaving: boolean = false;
  accountForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    role: ['', Validators.required],
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirm_password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService,
    private toastr: ToastrService,
    private validatorsService: ValidatorsService,
    private dialogRef: MatDialogRef<PostAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public account: AccountOverview
  ) {
    if (account) this.loadForm(account);
  }

  loadForm(account: AccountOverview) {
    this.accountForm.controls['password'].removeValidators(Validators.required);
    this.accountForm.controls['confirm_password'].removeValidators(Validators.required);
    this.accountForm.removeControl('role');
    this.accountForm.reset({
      username: account.username,
      name: account.name,
      lastname: account.lastname,
      email: account.email,
      password: '',
      confirm_password: '',
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  saveAccount() {    
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }
    (this.account) ? this.requestUpdateAccount() : this.requestAddAccount();
  }

  requestAddAccount() {
    this.isSaving = true;
    this.accountsService
      .addAccount(this.accountForm.value)
      .subscribe({
        next: () => {
          this.toastr.success('Cuenta creada', 'Éxito');
          this.dialogRef.close(true);
          this.isSaving = false;
        },
        error: () => {
          this.toastr.error('No se pudo crear la cuenta', 'Error');
          this.isSaving = false;
        },
      });
    }

    requestUpdateAccount() {
      this.isSaving = true;
      const { confirm_password, ...account } = this.accountForm.value;
      this.accountsService
        .updateAccount(this.account._id, account)
        .subscribe({
          next: () => {
            this.toastr.success('Cuenta actualizada', 'Éxito');
            this.dialogRef.close(true);
            this.isSaving = false;
          },
          error: () => {
            this.toastr.error('No se pudo actualizar la cuenta', 'Error');
            this.isSaving = false;
          },
        });
    }
}
