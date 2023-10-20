import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from '../interfaces/auth.interfaces';
import { Observable } from 'rxjs';
import { UserCredentials } from 'src/app/shared/interfaces/credentials.interfaces';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private credentialsService: CredentialsService,
    private router: Router
  ) {}

  login(loginCredentials: LoginCredentials): Observable<UserCredentials> {
    return this.http.post<UserCredentials>(
      `${this.apiUrl}/auth/login`,
      loginCredentials
    );
  }

  logout() {
    this.credentialsService.clearCredentials();
    this.router.navigate(['/auth/login']);
  }
}
