import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountCreate, AccountEdit, AccountOverview } from '../interfaces/accounts.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAccounts(search?: string): Observable<AccountOverview[]> {
    let params = new HttpParams();
    if (search) params = params.append('search', search);
    return this.http.get<AccountOverview[]>(`${this.apiUrl}/users`, { params });
  }

  deleteAccount(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`);
  }

  addAccount(account: AccountCreate): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, account);
  }

  updateAccount(id: string, account: AccountEdit): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${id}`, account);
  }
}
