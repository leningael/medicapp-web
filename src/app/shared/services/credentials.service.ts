import { Injectable } from '@angular/core';
import { UserCredentials, UserData } from '../interfaces/credentials.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private _token: string = localStorage.getItem('app-token') || '';;
  private _user_credentials: UserData = JSON.parse(localStorage.getItem('user_cred') || '{}');
  private _role: string = localStorage.getItem('role') || '';

  public get token(): string {
    return this._token;
  }
  public set token(value: string) {
    this._token = value;
    localStorage.setItem('app-token', value);
  }

  public get user_credentials(): UserData {
    return this._user_credentials;
  }
  public set user_credentials(value: UserData) {
    this._user_credentials = value;
    localStorage.setItem('user_cred', JSON.stringify(value));
  }

  public get role(): string {
    return this._role;
  }
  public set role(value: string) {
    this._role = value;
    localStorage.setItem('role', value);
  }
  
  constructor() {}

  setCredentials(credentials:UserCredentials){    
    this.token = credentials.token || '';
    this.user_credentials = credentials.user || {} as UserData;
    this.role = credentials.role || '';
  }

  clearCredentials(){
    this.token = '';
    this.user_credentials = {} as UserData;
    this.role = '';
    localStorage.clear();
  }

  checkRole(role:string):boolean{
    return this.role === role;
  }
}
