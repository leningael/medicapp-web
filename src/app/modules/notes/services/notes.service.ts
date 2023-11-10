import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notes } from '../interfaces/notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient,
  ) {}

  getNotes(term?: string){
    return this.http.get<Notes[]>(`${this.apiUrl}/note`);
  }
  
}
