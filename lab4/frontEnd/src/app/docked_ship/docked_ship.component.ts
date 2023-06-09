import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import SweetAlert from 'sweetalert2';
import {Ship} from "../ship/ship.component";
import {Dock} from "../dock/dock.component";

export interface Docked_ship {
  _id: any;
  ship: any;
  dock: any;
}

@Component({
  selector: 'app-docked_ship',
  templateUrl: './docked_ship.component.html',
  styleUrls: ['./docked_ship.component.scss'],
  providers: [MatDialog],
})
export class Docked_shipComponent implements OnInit {
  public docked_ships: Array<Docked_ship> = new Array<Docked_ship>();
  public ships: Array<Ship> = new Array<Ship>();
  public docks: Array<Dock> = new Array<Dock>();
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.http.get('http://localhost:8080/docked_ship/list').subscribe({
      next: (data: any) => (this.docked_ships = data as Array<Docked_ship>),
      error: (err) => console.log(err),
    });

    this.http.get('http://localhost:8080/ship/list').subscribe({
      next: (data: any) => (this.ships = data as Array<Ship>),
      error: (err) => console.log(err),
    });

    this.http.get('http://localhost:8080/dock/list').subscribe({
      next: (data: any) => (this.docks = data as Array<Dock>),
      error: (err) => console.log(err),
    });
  }
  public profileForm = new FormGroup({
    ship: new FormControl('', [
      Validators.required,
    ]),
    dock: new FormControl('', [
      Validators.required,
    ]),
  });

  onSubmit() {
    if (this.profileForm.valid) {
      this.http
        .post('http://localhost:8080/docked_ship/add', this.profileForm.value)
        .subscribe({
          next: (data: any) => {
            this.docked_ships.push(data as Docked_ship);
            SweetAlert.fire('Successfully', `add docked ship`, 'success');
            this.profileForm.reset();
          },
          error: (err) => console.log(err),
        });
    }
  }

  onDelete(docked_ship: Docked_ship) {
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
          .post(`http://localhost:8080/docked_ship/remove`, docked_ship)
          .subscribe({
            next: (_: any) =>
              (this.docked_ships = this.docked_ships.filter((p) => p != docked_ship)),
            error: (err) => console.log(err),
          });
        SweetAlert.fire('Deleted!', 'Your ship has been deleted.', 'success');
      }
    });
  }
}
