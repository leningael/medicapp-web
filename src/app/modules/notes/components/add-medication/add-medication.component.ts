import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Meds } from '../../interfaces/notes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.css']
})
export class AddMedicationComponent {
  public meds: Meds[];
  public formData: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) data:{meds:Meds[]},
    private dialogRef: MatDialogRef<AddMedicationComponent>,
    private fb: FormBuilder,
    ){
      this.meds = data.meds;
      this.formData = new FormGroup({
        medicament: this.fb.control('', [Validators.required]),
        quantity: this.fb.control(''),
        frequency: this.fb.control(''),
        duration: this.fb.control(''),
        consume_method: this.fb.control(''),
        notes: this.fb.control(''),
        dose: this.fb.control(''),
      });
  }

  
  handleClose(){
    this.dialogRef.close(this.meds);
  }

  addMedicament() {
    if(!this.formData.valid) return;
    const newMed: Meds = {
      medicament: this.formData.value["medicament"],
      quantity: this.formData.value["dose"],
      frequency: this.formData.value["frequency"],
      duration: this.formData.value["duration"],
      notes: this.formData.value["notes"],
      consume_method: this.formData.value["consume_method"],
      dose: this.formData.value["dose"],
    }
    this.formData.reset();
    this.meds.push(newMed);
  }
  editMed(index: number){
    if(this.meds.length === 0) return;
    const medicament: Meds = this.meds[index];
    this.formData.setValue({
      medicament: medicament.medicament,
      quantity: medicament.quantity,
      frequency: medicament.frequency,
      duration: medicament.duration,
      notes: medicament.notes,
      consume_method: medicament.consume_method,
      dose: medicament.dose,
    });
    this.meds.splice(index, 1);
    console.log(this.meds);
  }
  deleteMed(id: number) {
    this.meds = this.meds.filter((med, index) => index !== id);
  }
}
