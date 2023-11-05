import { Component, OnInit } from '@angular/core';
import { Notes } from '../../interfaces/notes';
import { NotesService } from '../../services/notes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.css']
})
export class NotesPageComponent implements OnInit{
  public options: string[] = ['Nombre (A-Z)', 'Fecha (⬇️)'];
  public data: Notes[];
  public displayedColumns: string[]= ["date","title"];
  public isLoading: boolean = true;

  constructor(private ns: NotesService){
    this.data = [];
  }

  ngOnInit(): void {
    this.ns.getNotes().subscribe({
      next: (data) => {
        this.data = data;
        this.isLoading = false;
      }
    });
  }
  searchNotes(search: string): void{
    const term = search.trim();
  }
}
