import { Component, OnInit } from '@angular/core';
import { Notes } from '../../interfaces/notes';
import { NotesService } from '../../services/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteComponent } from '../../components/add-note/add-note.component';
import { ToastrService } from 'ngx-toastr';
import { PatientOverview } from 'src/app/modules/patient/interfaces/patient.interfaces';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.css'],
})
export class NotesPageComponent implements OnInit {
  public data: Notes[];
  public displayedColumns: string[] = ['date', 'title', 'option'];
  public isLoading: boolean = true;
  public sortOptions: string[] = [
    'Nombre (A-Z)',
    'Nombre (Z-A)',
    'Fecha (Asc.)',
    'Fecha (Desc.)',
  ];
  public selectedValue: string = 'default';

  constructor(
    private notesService: NotesService,
    private toastr: ToastrService,
    private matDialog: MatDialog
  ) {
    this.data = [];
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.notesService.getNotes().subscribe({
      next: (data) => {
        this.isLoading = true;
        this.data = data;
        this.isLoading = false;
      },
    });
  }
  searchNotes(search: any): void {
    this.notesService.getNotes(search).subscribe({
      next: (data) => {
        this.isLoading = true;
        this.data = data;
        this.isLoading = false;
      },
    });
  }

  addNote(noteId?: string, patient?: PatientOverview) {
    let dialog = this.matDialog.open(AddNoteComponent, {
      data: {
        noteId,
        patient,
      },
      width: '90vw',
      height: '90vh',
      hasBackdrop: false,
      disableClose: true,
    });
    dialog.afterClosed().subscribe({
      next: (result) => {
        if(!result) return;
        if (!result._id) this.notesService.postNote(result).subscribe(()=> this.succesUpload());
        else this.notesService.updateNote(result).subscribe(()=> this.succesUpload());
      },
    });
  }
  succesUpload(){
    this.toastr.success('Nota cargada correctamente', 'Éxito');
    this.data = [];
    this.isLoading = true;
    this.fetchData();
  }
  handleDeleteNote(id: string) {
    let dialog = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: "Eliminar",
        message: "¿Estás seguro de eliminar esta nota?"
      },
      width: '30vw',
      height: '20vh',
      disableClose: true,
    })
    dialog.afterClosed().subscribe(res =>{
      if(!res) return
      this.notesService.deleteNote(id).subscribe({
        next: () => {
          this.toastr.success('Se ha eliminado la nota', 'Éxito');
          this.data = this.data.slice().filter((element) => element._id != id);
        },
        error: () => {
          this.toastr.error('Ha ocurrido un error al eliminar la nota', 'Error');
        },
      });
    });
  }

  handleSort() {
    const option = this.selectedValue.split(' ');
    switch (option[0].toLowerCase().trim()) {
      case 'nombre':
        const sortName: Record<string, (a: Notes, b: Notes) => number> = {
          '(a-z)': (a: Notes, b: Notes) =>
            ('' + a.patient.name).localeCompare(b.patient.name),
          '(z-a)': (a: Notes, b: Notes) =>
            ('' + b.patient.name).localeCompare(a.patient.name),
        };
        this.data = this.data
          .slice()
          .sort(sortName[option[1].toLowerCase().trim()]);
        break;
      case 'fecha':
        const dateSort: Record<string, (a: Notes, b: Notes) => number> = {
          '(asc.)': (a: Notes, b: Notes) =>
            new Date(a.date!).getTime() - new Date(b.date!).getTime(),
          '(desc.)': (a: Notes, b: Notes) =>
            new Date(b.date!).getTime() - new Date(a.date!).getTime(),
        };
        this.data = this.data
          .slice()
          .sort(dateSort['' + option[1].toLowerCase().trim()]);
        break;
      default:
        break;
    }
  }
}
