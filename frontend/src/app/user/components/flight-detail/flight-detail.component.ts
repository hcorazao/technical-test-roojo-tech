import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from '../../models/flight';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.scss']
})
export class FlightDetailComponent implements OnInit {

  flight: Flight;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.loadFlightData(this.route.snapshot.params.flightId);
  }

  loadFlightData(flightId) {
    this.userService.findFlight(flightId).subscribe((response) => {
      if (!!response) {
        this.flight = response;
      }
    }, (error=>{
      console.log("error", error);
    }));
  }

}
