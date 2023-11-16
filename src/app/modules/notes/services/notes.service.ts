import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NoteContent, Notes } from '../interfaces/notes';

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

  getDetails(id: string){
    return this.http.get<NoteContent>(`${this.apiUrl}/note/${id}`);
  }
  postNote(note: Notes){
    return this.http.post(`${this.apiUrl}/note/`, note);
  }

  deleteNote(id: string){
    return this.http.delete(`${this.apiUrl}/note/${id}`);
  }
  updateNote(note: Notes){
    return this.http.put(`${this.apiUrl}/note/${note._id}`, note);
  }
  
}
