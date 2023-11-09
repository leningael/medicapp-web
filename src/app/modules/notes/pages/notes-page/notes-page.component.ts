import { Component, OnInit } from '@angular/core';
import { Notes } from '../../interfaces/notes';
import { NotesService } from '../../services/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { PatientsListComponent } from 'src/app/modules/patient/pages/patients-list/patients-list.component';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.css']
})
export class NotesPageComponent implements OnInit{
  public options: string[] = ['Nombre (A-Z)', 'Fecha (⬇️)'];
  public data: Notes[];
  public displayedColumns: string[]= ["date","title", "option"];
  public isLoading: boolean = true;

  constructor(private ns: NotesService,
              private matDialog: MatDialog){
    this.data = [];
  }

  ngOnInit(): void {
    this.data = [{
      id: "1",
      title: "Note 1",
      doctor_name: "Doctor 1",
      pacient_name: "Pacient 1",
      date: "01/01/2022",
      reason: "Reason 1",
      information: "Information 1",
      diagnosis: "Diagnosis 1",
      temperature: "Temperature 1",
      medication: [{medicament: "Medicament 1", quantity: "Quantity 1", consume_method: "Consume Method 1", frequency: "Frequency 1", duration: "Duration 1", notes: "Notes 1"}],
      weight: "Weight 1",
      height: "Height 1",
      imc: "IMC 1",
      sistolic_pressure: "Sistolic Pressure 1",
      diastolic_pressure: "Diastolic Pressure 1"
    }]
    this.isLoading = false;
    // this.ns.getNotes().subscribe({
    //   next: (data) => {
    //     this.data = data;
    //     this.isLoading = false;
    //   }
    // });
  }
  searchNotes(search: string): void{
    const term = search.trim();
  }

  addNote(){
    let dialog = this.matDialog.open(PatientsListComponent,{
      data: {},
      width: '800px',
    });
    dialog.afterClosed().subscribe(result => {
      console.log(result);
    });

  }
}
