import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ship } from '../ship/ship.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ship_update',
  templateUrl: './ship_update.component.html',
  styleUrls: ['./ship_update.component.scss'],
})
export class Ship_updateComponent {
  public editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<Ship_updateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ship: Ship }
  ) {
    this.editForm = new FormGroup({
      name: new FormControl(data.ship.name, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      country: new FormControl(data.ship.country, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
      ]),
      number: new FormControl(data.ship.number, [
        Validators.required,
        Validators.max(999999),
      ]),
      tonnage: new FormControl(data.ship.tonnage, [
        Validators.required,
        Validators.min(20),
        Validators.max(100),
      ]),
      submersion: new FormControl(data.ship.submersion, [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    const updatedShip = {
      _id: this.data.ship._id,
      name: this.editForm.value.name,
      country: this.editForm.value.country,
      number: this.editForm.value.number,
      tonnage: this.editForm.value.tonnage,
      submersion: this.editForm.value.submersion,
    };
    this.dialogRef.close(updatedShip);
  }
}
