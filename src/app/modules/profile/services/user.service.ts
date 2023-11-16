import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData, userInformation } from 'src/app/shared/interfaces/credentials.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getUser(id: string): Observable<UserData>{
    return this.http.get<UserData>(`${this.apiUrl}/users/${id}`);
  } 

  getUserInformation(id: string): Observable<userInformation>{
    return this.http.get<userInformation>(`${this.apiUrl}/users/${id}/information`);
  }

  updateUser(id: string, user: UserData): Observable<UserData>{
    return this.http.put<UserData>(`${this.apiUrl}/users/${id}`, user);
  }
}
