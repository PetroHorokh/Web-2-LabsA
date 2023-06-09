import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import SweetAlert from 'sweetalert2';
import {Ship_updateComponent} from "../ship_update/ship_update.component";
export interface Ship {
  _id: any;
  name: string;
  number: number;
  country: number;
  tonnage: number;
  submersion: number;
}

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
  providers: [MatDialog],
})
export class ShipComponent implements OnInit {
  public ships: Array<Ship> = new Array<Ship>();
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.http.get('http://localhost:8080/ship/list').subscribe({
      next: (data: any) => (this.ships = data as Array<Ship>),
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
    tonnage: new FormControl('', [
      Validators.required,
      Validators.min(20),
      Validators.max(100),
    ]),
    submersion: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(10),
    ]),
  });

  onSubmit() {
    if (this.profileForm.valid) {
      this.http
        .post('http://localhost:8080/ship/add', this.profileForm.value)
        .subscribe({
          next: (data: any) => {
            this.ships.push(data as Ship);
            SweetAlert.fire('Successfully', `add ship ${data.name}`, 'success');
            this.profileForm.reset();
          },
          error: (err) => console.log(err),
        });
    }
  }

  onDelete(ship: Ship) {
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
          .post(`http://localhost:8080/ship/remove`, ship)
          .subscribe({
            next: (_: any) =>
              (this.ships = this.ships.filter((p) => p != ship)),
            error: (err) => console.log(err),
          });
        SweetAlert.fire('Deleted!', 'Your ship has been deleted.', 'success');
      }
    });
  }

  onEdit(ship: Ship) {
    const dialogRef = this.dialog.open(Ship_updateComponent, {
      width: '400px',
      position: { top: '-40vh', left: '35vw' },
      data: { ship: ship },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.http
        .put(`http://localhost:8080/ship/edit`, result)
        .subscribe({
          next: (res) => {
            let index = this.ships.indexOf(ship);
            this.ships[index] = res as Ship;
            SweetAlert.fire('Edited!', 'Successfully edit ship', 'success');
          },
          error: (_) =>
            SweetAlert.fire('Error occurred', 'Error when update ship', 'error'),
        });
    });
  }
}
