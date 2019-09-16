import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { FlightsComponent } from './flights/flights.component';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';

const routes: Routes = [
  {
    path: 'my-reservations',
    component: MyReservationsComponent,
  },
  {
    path: 'flights',
    component: FlightsComponent,
  },
  {
    path: 'flight-detail',
    component: FlightDetailComponent,
  },
  { path: '', redirectTo: 'flights', pathMatch: 'full' },
  { path: '**', redirectTo: 'flights' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
