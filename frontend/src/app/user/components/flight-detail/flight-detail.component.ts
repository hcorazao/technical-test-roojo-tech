import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Flight } from '../../models/flight';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.scss']
})
export class FlightDetailComponent implements OnInit {
  flight: Flight;
  reservationsForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.loadFlightData(this.route.snapshot.params.flightId);
  }

  buildForm() {
    const controls = {
      userDocument: ['', Validators.compose([
        Validators.required
      ])],
      name: ['', Validators.compose([
        Validators.required
      ])],
      birthDate: ['', Validators.compose([
        Validators.required
      ])]
    };
    this.reservationsForm = this.formBuilder.group(controls);
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
