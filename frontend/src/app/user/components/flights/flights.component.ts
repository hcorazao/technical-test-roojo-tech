import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { Flight } from '../../models/flight';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {
  flights: Flight[];

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadFlights();
  }

  loadFlights() {
    this.userService.getFlights().subscribe((response) => {
      if (!!response) {
        this.flights = response.flights;
      }
    }, (error=>{
      console.log("error", error);
    }));
  }

  selectFlight(flight: Flight) {
    console.log("flight", flight);
    const params = {
      flightId: flight.id
    };
    this.router.navigate(['/user/flight-detail', params]);
  }

}
