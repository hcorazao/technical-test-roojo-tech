import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { UserRoutingModule } from './user-routing.module';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightDetailComponent } from './components/flight-detail/flight-detail.component';

import { UserService } from './user.service';
@NgModule({
  declarations: [
  MyReservationsComponent,
  FlightsComponent,
  FlightDetailComponent],
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatListModule,
    FlexLayoutModule, 
    HttpClientModule, 
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserService]
})
export class UserModule { 
}
