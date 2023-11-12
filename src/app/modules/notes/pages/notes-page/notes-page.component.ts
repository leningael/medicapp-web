import { Component, OnInit } from '@angular/core';
import { Notes } from '../../interfaces/notes';
import { NotesService } from '../../services/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteComponent } from '../../components/add-note/add-note.component';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.css']
})
export class NotesPageComponent implements OnInit{
  public data: Notes[];
  public displayedColumns: string[]= ["date","title", "option"];
  public isLoading: boolean = true;
  public sortOptions: string[] = ['Nombre (A-Z)', 'Nombre (Z-A)', 'Fecha (Asc.)', 'Fecha (Desc.)'] 
  public selectedValue: string = 'default';

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
      date: "04/01/2022",
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
    },
    {
      id: "2",
      title: "Note 2",
      doctor_name: "Doctor 1",
      pacient_name: "Pacient 2",
      date: "02/01/2022",
      reason: "Reason 2",
      information: "Information 2",
      diagnosis: "Diagnosis 2",
      temperature: "Temperature 2",
      medication: [{medicament: "Medicament 1", quantity: "Quantity 1", consume_method: "Consume Method 1", frequency: "Frequency 1", duration: "Duration 1", notes: "Notes 1"}],
      weight: "Weight 2",
      height: "Height 2",
      imc: "IMC 2",
      sistolic_pressure: "Sistolic Pressure 2",
      diastolic_pressure: "Diastolic Pressure 2"
      },
    ]
    this.isLoading = false;
    //FIXME: toggle comment to start service
    // this.ns.getNotes().subscribe({
    //   next: (data) => {
    //     this.data = data;
    //     this.isLoading = false;
    //   }
    // });
  }

  searchNotes(search: any): void{
    //this.ns.getNotes(search).subscribe({
    //  next: (data) => { 
    //  this.isLoading = true;
    //  this.data = data;
    //  this.isLoading = false;
    //}
    //});
    this.data = this.data.filter((element) => {
      return element.pacient_name.toLowerCase().includes(search.toLowerCase());
    });

  }

  addNote(noteId? : string){
    let dialog = this.matDialog.open(AddNoteComponent,{
      data: {
        noteId
      },
      width: '800px',
      height: '600px'
    });
    dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  handleDeleteNote(id: string){
    this.data = this.data.filter((element)=>element.id !== id)
    console.log(id);
  }

  handleSort(){
    const option = this.selectedValue.split(' '); 
    switch(option[0].toLowerCase().trim()){
      case 'nombre':
        const sortName: Record<string, (a: Notes, b: Notes)=> number> = {
          "(a-z)":  (a:Notes,b:Notes) => (''+a.pacient_name).localeCompare(b.pacient_name),
          "(z-a)":  (a:Notes,b:Notes) => (''+b.pacient_name).localeCompare(a.pacient_name),
        } 
        this.data = this.data.slice().sort(sortName[option[1].toLowerCase().trim()]);
        break;
      case 'fecha':
        const dateSort: Record<string, (a: Notes, b: Notes)=> number> = {
          '(asc.)': (a:Notes,b:Notes) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          '(desc.)': (a:Notes,b:Notes) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        }
        this.data = this.data.slice().sort(dateSort[''+option[1].toLowerCase().trim()]);
        break;
      default:
        break;
    }
  }

}
