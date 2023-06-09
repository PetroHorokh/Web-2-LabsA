import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dock } from '../dock/dock.component';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dock_update',
  templateUrl: './dock_update.component.html',
  styleUrls: ['./dock_update.component.scss'],
})
export class Dock_updateComponent {
  public editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<Dock_updateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dock: Dock }
  ) {
    this.editForm = new FormGroup({
      port: new FormControl(data.dock.port, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(60),
      ]),
      number: new FormControl(data.dock.number, [
        Validators.required,
        Validators.max(999999),
      ]),
      capacity: new FormControl(data.dock.capacity, [
        Validators.required,
        Validators.max(500),
      ]),
      minimal_submersion: new FormControl(data.dock.minimal_submersion, [
        Validators.required,
        Validators.min(10),
        Validators.max(60),
      ]),
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    const updatedDock = {
      _id: this.data.dock._id,
      port: this.editForm.value.port,
      number: this.editForm.value.number,
      capacity: this.editForm.value.capacity,
      minimal_submersion: this.editForm.value.minimal_submersion,
    };
    this.dialogRef.close(updatedDock);
  }
}
