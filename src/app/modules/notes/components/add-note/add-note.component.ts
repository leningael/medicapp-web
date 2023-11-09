import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit{

  public patient_id: string;

  
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogService: MatDialog){
              this.patient_id = '';
  }

  ngOnInit(): void {
    this.patient_id = this.data.patient_id || '';
  }

}
