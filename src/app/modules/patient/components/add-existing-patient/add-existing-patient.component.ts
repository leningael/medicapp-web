import { Component, Inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { PatientService } from '../../services/patient.service';
import { ToastrService } from 'ngx-toastr';
import { SelectPersonArgs } from 'src/app/shared/interfaces/credentials.interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../../interfaces/patient.interfaces';
import { CredentialsService } from '../../../../shared/services/credentials.service';

@Component({
  selector: 'app-add-existing-patient',
  templateUrl: './add-existing-patient.component.html',
  styleUrls: ['./add-existing-patient.component.css']
})
export class AddExistingPatientComponent {
  isSaving: boolean = false;
  constructor(
    private patientsService: PatientService,
    private credentialsService: CredentialsService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddExistingPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public doctor_id: string,
  ) { 
   
  }

  requestPatients(args: SelectPersonArgs){
    return this.patientsService.getAllExistingPatients(this.doctor_id, args.search)
    .pipe(
      catchError((err) => {
        if(err.status !== 404)
          this.toastr.error("No se encontraron pacientes coincidentes", "Error");
        return of([]);
      }
    ));
  }

  onSelectPatient(patient: Patient){
    this.isSaving = true;
    this.patientsService.addDoctorToPatient(patient._id!, this.doctor_id).subscribe(
      () => {
        this.toastr.success("Paciente añadido", "Éxito");
        this.dialogRef.close(true);
      }
    )
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
