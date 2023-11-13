import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserData, UserEditData } from 'src/app/shared/interfaces/credentials.interfaces';
import { ProfilePageComponent } from '../../pages/profile-page/profile-page.component';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  public userEditForm: FormGroup = this.formBuilder.group({
    name: [''],
    lastname: [''],
    username: [''],
    email: ['', [Validators.pattern(this.validatorService.emailPattern)]],
    password: [''],
  })
  constructor(
    public dialogRef: MatDialogRef<ProfilePageComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public user: UserEditData,
    private validatorService: ValidatorsService,
    private userService: UserService,
  ) { 
    this.loadForm(this.user);
  }

  loadForm(user: UserEditData): void {
    this.userEditForm.reset({
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      password: ''
    });
  }

  saveData(): void {
    if (this.userEditForm.value.password !== '' && this.userEditForm.value.password < 8) return
    // this.userEditForm.markAllAsTouched();
    // if (this.userEditForm.invalid) return;
    this.userService.updateUser(this.user._id, this.userEditForm.value)
    .subscribe(
    (user) => {
      this.dialogRef.close(user);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
