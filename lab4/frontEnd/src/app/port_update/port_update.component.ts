import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Port} from "../port/port.component";

@Component({
  selector: 'app-port_update',
  templateUrl: './port_update.component.html',
  styleUrls: ['./port_update.component.scss'],
})
export class Port_updateComponent {
  public editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<Port_updateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { port: Port }
  ) {
    this.editForm = new FormGroup({
      name: new FormControl(data.port.name, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      country: new FormControl(data.port.country, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
      ]),
      number: new FormControl(data.port.number, [
        Validators.required,
        Validators.max(999999),
      ]),
      address: new FormControl(data.port.address, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50),
      ]),
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    const updatedPort = {
      _id: this.data.port._id,
      name: this.editForm.value.name,
      country: this.editForm.value.country,
      number: this.editForm.value.number,
      address: this.editForm.value.address,
    };
    this.dialogRef.close(updatedPort);
  }
}
