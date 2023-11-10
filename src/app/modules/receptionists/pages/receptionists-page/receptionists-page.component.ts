import { Component, OnInit } from '@angular/core';
import { ReceptionistsService } from '../../services/receptionists.service';
import { ReceptionistOverview } from '../../interfaces/receptionists.interfaces';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddReceptionistDialogComponent } from '../../components/add-receptionist-dialog/add-receptionist-dialog.component';

@Component({
  selector: 'app-receptionists-page',
  templateUrl: './receptionists-page.component.html',
  styleUrls: ['./receptionists-page.component.css']
})
export class ReceptionistsPageComponent implements OnInit {
  receptionists: ReceptionistOverview[] = [];
  doctorId: string = this.credentialsService.user_credentials._id;
  isLoading: boolean = false;

  constructor(
    private receptionistsService:ReceptionistsService, 
    private credentialsService:CredentialsService,
    private dialog:MatDialog,
    private toastr: ToastrService,
    ) { }
  
  ngOnInit(): void {
    this.requestReceptionists();
  }

  requestReceptionists() {
    this.isLoading = true;
    this.receptionistsService.getDrReceptionists(this.doctorId).subscribe({
      next: (receptionists) => {
        this.receptionists = receptionists;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error("Error al cargar la lista de recepcionistas", "Error");
        this.isLoading = false;
      },
    });
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

}
