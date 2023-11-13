import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { is } from 'date-fns/locale';
import { ClinicalHistory, Patient } from 'src/app/modules/patient/interfaces/patient.interfaces';
import { PatientService } from 'src/app/modules/patient/services/patient.service';

@Component({
  selector: 'clinical-history',
  templateUrl: './clinical-history.component.html',
  styleUrls: ['./clinical-history.component.css']
})
export class ClinicalHistoryComponent implements OnInit {
  @Input() patient!: Patient;
  public isEditing: boolean = false
  patientId: string = ''
  public clinicalHistoryForm: FormGroup = this.formBuilder.group({
    pathological: [''],
    non_pathological: [''],
    inherit: [''],
    surgical: [''],
    current_medication: [''],
    allergies: [''],   
  })

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService
  ){
    this.clinicalHistoryForm.disable();
  }
  ngOnInit(): void {
    if (this.patient.clinical_history) this.loadForm(this.patient.clinical_history!)
  }

  loadForm(clinicalHistory: ClinicalHistory): void{
    this.clinicalHistoryForm.reset({
      pathological: clinicalHistory.pathological,
      non_pathological: clinicalHistory.non_pathological,
      inherit: clinicalHistory.inherit,
      surgical: clinicalHistory.surgical,
      current_medication: clinicalHistory.current_medication,
      allergies: clinicalHistory.allergies,
    });
  }
  
  edit() {
    if (this.isEditing == false) {
      this.isEditing = true;
      this.clinicalHistoryForm.enable();
    }
    else {
      this.isEditing = false;
      this.clinicalHistoryForm.disable();
      this.savePatientData()
    }
  }

  getUpdatedClinicalHistory(){
    this.patientService.getPatient(this.patient._id!).subscribe(
      (patient: Patient) => {
        this.patient = patient;
      }
    )
  }

  savePatientData(){
    this.patientService.updatePatientClinicalHistory(this.patient._id!, this.clinicalHistoryForm.value).subscribe(
      (patient: Patient) => {
        this.getUpdatedClinicalHistory()
      }
    )
  }

  cancel(){
    if (this.patient.clinical_history) this.loadForm(this.patient.clinical_history!)
    else this.clinicalHistoryForm.reset();
    this.isEditing = false;
    this.clinicalHistoryForm.disable();
   
  }
}
