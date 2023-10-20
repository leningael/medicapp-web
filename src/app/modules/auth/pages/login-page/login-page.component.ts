import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { AuthService } from '../../services/auth.service';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required,  Validators.pattern(this.validatorsService.emailPattern)]],
    password: ['' , [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private authService: AuthService,
    private credentialsService: CredentialsService,
    private router: Router
  ) {}

  signIn() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      {
        next: (credentials) => {
          this.credentialsService.setCredentials(credentials);          
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          console.log(err);
        },
      }
    )
  }
}
