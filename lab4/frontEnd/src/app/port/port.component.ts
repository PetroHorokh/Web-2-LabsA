import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import SweetAlert from 'sweetalert2';
import {Port_updateComponent} from "../port_update/port_update.component";
export interface Port {
  _id: any;
  name: string;
  number: number;
  country: number;
  address: string;
}

@Component({
  selector: 'app-port',
  templateUrl: './port.component.html',
  styleUrls: ['./port.component.scss'],
  providers: [MatDialog],
})
export class PortComponent implements OnInit {
  public ports: Array<Port> = new Array<Port>();
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.http.get('http://localhost:8080/port/list').subscribe({
      next: (data: any) => (this.ports = data as Array<Port>),
      error: (err) => console.log(err),
    });
  }
  public profileForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]),
    number: new FormControl('', [
      Validators.required,
      Validators.max(999999),
    ]),
    country: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(30),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(50),
    ]),
  });

  onSubmit() {
    if (this.profileForm.valid) {
      this.http
        .post('http://localhost:8080/port/add', this.profileForm.value)
        .subscribe({
          next: (data: any) => {
            this.ports.push(data as Port);
            SweetAlert.fire('Successfully', `add ${data.name}`, 'success');
            this.profileForm.reset();
          },
          error: (err) => console.log(err),
        });
    }
  }

  onDelete(port: Port) {
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
          .post(`http://localhost:8080/port/remove`, port)
          .subscribe({
            next: (_: any) =>
              (this.ports = this.ports.filter((p) => p != port)),
            error: (err) => console.log(err),
          });
        SweetAlert.fire('Deleted!', 'Your port has been deleted.', 'success');
      }
    });
  }

  onEdit(port: Port) {
    const dialogRef = this.dialog.open(Port_updateComponent, {
      width: '400px',
      position: { top: '-40vh', left: '35vw' },
      data: { port: port },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.http
        .put(`http://localhost:8080/port/edit`, result)
        .subscribe({
          next: (res) => {
            let index = this.ports.indexOf(port);
            this.ports[index] = res as Port;
            SweetAlert.fire('Edited!', 'Successfully edit port', 'success');
          },
          error: (_) =>
            SweetAlert.fire('Error occurred', 'Error when update port', 'error'),
        });
    });
  }
}
