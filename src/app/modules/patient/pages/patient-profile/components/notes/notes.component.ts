import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddNoteComponent } from 'src/app/modules/notes/components/add-note/add-note.component';
import { Notes } from 'src/app/modules/notes/interfaces/notes';
import { NotesService } from 'src/app/modules/notes/services/notes.service';
import { PatientOverview } from 'src/app/modules/patient/interfaces/patient.interfaces';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  public displayedColumns: string[] = ['date', 'title', 'option'];
  public notes: Notes[] = [];
  public isLoading: boolean = true;

  @Input() patientId!: string | undefined;

  constructor(
    private notesService: NotesService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  handleDeleteNote(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar nota',
        message: '¿Estás seguro de eliminar esta nota?',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.notesService.deleteNote(id).subscribe(() => {
          this.toastr.success('Nota eliminada correctamente', 'Éxito');
          this.isLoading = true;
          this.fetchData();
        });
      }
    });
  }
  editNote(noteId: any, patient: any) {
    let dialog = this.dialog.open(AddNoteComponent, {
      data: {
        noteId,
        patient,
      },
      width: '90vw',
      height: '90vh',
    });
    dialog.afterClosed().subscribe({
      next: (result) => {
        if (!result) return;
        if (!result._id)
          this.notesService
            .postNote(result)
            .subscribe(() => this.succesUpload());
        else
          this.notesService
            .updateNote(result)
            .subscribe(() => this.succesUpload());
      },
    });
  }
  private succesUpload(): void {
    this.toastr.success('Nota cargada correctamente', 'Éxito');
    this.notes = [];
    this.isLoading = true;
    this.fetchData();
  }
  private fetchData() {
    this.notesService.getPatientNote(this.patientId!).subscribe((res) => {
      this.notes = res;
      this.isLoading = false;
    });
  }
}
