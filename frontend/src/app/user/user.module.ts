import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { UserRoutingModule } from './user-routing.module';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { FlightsComponent } from './flights/flights.component';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';

@NgModule({
  declarations: [
  MyReservationsComponent,
  FlightsComponent,
  FlightDetailComponent],
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatDialogModule, 
    MatListModule,
    FlexLayoutModule, 
    HttpClientModule, 
    MatProgressBarModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  // providers: [UploadService]
})
export class UserModule { 
}
