import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Flight } from '../models/flight';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {
  flights: Flight[];

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
    this.loadFlights();
  }

  loadFlights() {
    this.userService.getFlights().subscribe((response) => {
      console.log("response", response);
      if (!!response) {
        this.flights = response.flights;
      }
    }, (error=>{
      console.log("error", error);
    }));
  }

  selectFlight(flight: Flight) {
    console.log("flight", flight);
  }

}
