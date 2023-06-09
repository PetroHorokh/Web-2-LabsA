import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import SweetAlert from 'sweetalert2';
import {Dock_updateComponent} from "../dock_update/dock_update.component";
export interface Dock {
  _id: any;
  port: string;
  number: number;
  capacity: number;
  minimal_submersion: number;
}

@Component({
  selector: 'app-ship',
  templateUrl: './dock.component.html',
  styleUrls: ['./dock.component.scss'],
  providers: [MatDialog],
})
export class DockComponent implements OnInit {
  public docks: Array<Dock> = new Array<Dock>();
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.http.get('http://localhost:8080/dock/list').subscribe({
      next: (data: any) => (this.docks = data as Array<Dock>),
      error: (err) => console.log(err),
    });
  }
  public profileForm = new FormGroup({
    port: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(60),
    ]),
    number: new FormControl('', [
      Validators.required,
      Validators.max(999999),
    ]),
    capacity: new FormControl('', [
      Validators.required,
      Validators.max(500),
    ]),
    minimal_submersion: new FormControl('', [
      Validators.required,
      Validators.min(10),
      Validators.max(60),
    ]),
  });

  onSubmit() {
    if (this.profileForm.valid) {
      this.http
        .post('http://localhost:8080/dock/add', this.profileForm.value)
        .subscribe({
          next: (data: any) => {
            this.docks.push(data as Dock);
            SweetAlert.fire('Successfully', `add ship ${data.name}`, 'success');
            this.profileForm.reset();
          },
          error: (err) => console.log(err),
        });
    }
  }

  onDelete(dock: Dock) {
    SweetAlert.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .post(`http://localhost:8080/dock/remove`, dock)
          .subscribe({
            next: (_: any) =>
              (this.docks = this.docks.filter((p) => p != dock)),
            error: (err) => console.log(err),
          });
        SweetAlert.fire('Deleted!', 'Your ship has been deleted.', 'success');
      }
    });
  }

  onEdit(dock: Dock) {
    const dialogRef = this.dialog.open(Dock_updateComponent, {
      width: '400px',
      position: { top: '-40vh', left: '35vw' },
      data: { dock: dock },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.http
        .put(`http://localhost:8080/dock/edit`, result)
        .subscribe({
          next: (res) => {
            let index = this.docks.indexOf(dock);
            this.docks[index] = res as Dock;
            SweetAlert.fire('Edited!', 'Successfully edit ship', 'success');
          },
          error: (_) =>
            SweetAlert.fire('Error occurred', 'Error when update ship', 'error'),
        });
    });
  }
}
