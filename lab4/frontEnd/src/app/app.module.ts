import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ship_updateComponent } from './ship_update/ship_update.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ShipComponent } from './ship/ship.component';
import {PortComponent} from "./port/port.component";
import {Port_updateComponent} from "./port_update/port_update.component";
import {DockComponent} from "./dock/dock.component";
import {Dock_updateComponent} from "./dock_update/dock_update.component";
import {Docked_shipComponent} from "./docked_ship/docked_ship.component";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ShipComponent,
    Ship_updateComponent,
    PortComponent,
    Port_updateComponent,
    DockComponent,
    Dock_updateComponent,
    Docked_shipComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: 'ship', component: ShipComponent },
      { path: 'port', component: PortComponent },
      { path: 'dock', component: DockComponent },
      { path: 'home', component: HomeComponent },
      { path: 'docked_ship', component: Docked_shipComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
