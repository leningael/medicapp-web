import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from '../interfaces/auth.interfaces';
import { Observable } from 'rxjs';
import { UserCredentials } from 'src/app/shared/interfaces/credentials.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiUrl;

  constructor(private http:HttpClient) { }

  login(loginCredentials:LoginCredentials): Observable<UserCredentials>{
    return this.http.post<UserCredentials>(`${this.apiUrl}/auth/login`, loginCredentials);
  }
}
