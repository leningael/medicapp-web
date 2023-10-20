import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { AuthService } from '../../services/auth.service';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  isLoading: boolean = false;
  loginForm: FormGroup = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private authService: AuthService,
    private credentialsService: CredentialsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  signIn() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid || this.isLoading) return;
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (credentials) => {
        this.credentialsService.setCredentials(credentials);
        this.router.navigate(['/profile']);
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Usuario o contraseña incorrectos', 'Error');
        this.isLoading = false;
      },
    });
  }
}
