import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notes } from '../interfaces/notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  apiUrl: string = environment.apiUrl;
  //apiUrl = 'http://127.0.0.1:7004'
  constructor(
    private http: HttpClient,
  ) {}

  getNotes(){
    return this.http.get<Notes[]>(`${this.apiUrl}/note`);
  }
  
}
