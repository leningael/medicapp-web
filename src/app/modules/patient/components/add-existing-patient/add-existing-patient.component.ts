import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { PatientService } from '../../services/patient.service';
import { ToastrService } from 'ngx-toastr';
import { SelectPersonArgs } from 'src/app/shared/interfaces/credentials.interfaces';
import { MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../../interfaces/patient.interfaces';
import { CredentialsService } from '../../../../shared/services/credentials.service';

@Component({
  selector: 'app-add-existing-patient',
  templateUrl: './add-existing-patient.component.html',
  styleUrls: ['./add-existing-patient.component.css']
})
export class AddExistingPatientComponent {
  isSaving: boolean = false;
  public doctor_id: string = ''; 
  constructor(
    private patientsService: PatientService,
    private credentialsService: CredentialsService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddExistingPatientComponent>,
  ) { 
   
  }

  requestPatients(args: SelectPersonArgs){
    this.doctor_id = this.credentialsService.user_credentials._id;
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
    this.doctor_id = this.credentialsService.user_credentials._id;
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
