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
  morningMultiplicator: number = 1.2; // temporary for the demo
  weekendMultiplicator: number = 1.3; // temporary for the demo

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
        const timeDay = this.getTimeDay();
        const isWeekend = this.findIfIsWeekend();
        this.flights = response.flights;
        if (timeDay === 'morning') {
          this.flights.map((flight)=>{
            flight.price = flight.price*this.morningMultiplicator;
            return flight;
          });
        }
        if (!!isWeekend) {
          this.flights.map((flight)=>{
            flight.price = flight.price*this.weekendMultiplicator;
            return flight;
          });
        }
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

  getTimeDay() {
    const hour = new Date().getHours();
    let timeDay: string;
    if (hour < 12) {
      timeDay = 'morning';
    } else if (hour < 18) {
      timeDay = 'afternoon';
    } else {
      timeDay = 'evening';
    }
    return timeDay;
  }

  findIfIsWeekend() {
    const dayIndex = new Date().getDay();
    let isWeekend: boolean;
    if (dayIndex === 6 || dayIndex === 7) {
      isWeekend = true;
    } else {
      isWeekend = false;
    }
    return isWeekend;
  }

}
