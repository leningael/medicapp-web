import { Component, OnInit } from '@angular/core';
import { ReceptionistsService } from '../../services/receptionists.service';
import { ReceptionistOverview } from '../../interfaces/receptionists.interfaces';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddReceptionistDialogComponent } from '../../components/add-receptionist-dialog/add-receptionist-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-receptionists-page',
  templateUrl: './receptionists-page.component.html',
  styleUrls: ['./receptionists-page.component.css'],
})
export class ReceptionistsPageComponent implements OnInit {
  receptionists: ReceptionistOverview[] = [];
  receptionistsToSearch: string = '';
  doctorId: string = this.credentialsService.user_credentials._id;
  isLoading: boolean = false;
  removing: string | false = false;

  constructor(
    private receptionistsService: ReceptionistsService,
    private credentialsService: CredentialsService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.requestReceptionists();
  }

  requestReceptionists() {
    this.isLoading = true;
    this.receptionistsService.getDrReceptionists(this.doctorId, this.receptionistsToSearch).subscribe({
      next: (receptionists) => {
        this.receptionists = receptionists;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error(
          'Error al cargar la lista de recepcionistas',
          'Error'
        );
        this.receptionists = [];
        this.isLoading = false;
      },
    });
  }

  searchReceptionists(search: string) {
    this.receptionistsToSearch = search;
    this.requestReceptionists();
  }

  addReceptionist() {
    const dialogRef = this.dialog.open(AddReceptionistDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        doctorId: this.doctorId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.requestReceptionists();
    });
  }

  unassignReceptionist(receptionist: ReceptionistOverview) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Eliminar recepcionista',
        message: '¿Está seguro que desea eliminar este recepcionista?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.removing = receptionist._id;
      this.receptionistsService
        .unassignDoctor(receptionist._id, this.doctorId)
        .subscribe({
          next: () => {
            this.receptionists = this.receptionists.filter(
              (receptionist) => receptionist._id !== this.removing
            );
            this.removing = false;
          },
          error: () => {
            this.toastr.error('Error al desasignar recepcionista', 'Error');
            this.removing = false;
          },
        });
    });
  }
}
