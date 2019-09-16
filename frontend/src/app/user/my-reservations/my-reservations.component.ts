import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../user.service';
import { Flight } from '../models/flight';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {
  flights: Flight[];
  reservationsForm: FormGroup;

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  	this.buildForm();
  }

  loadFlights() {
    this.userService.getTickets().subscribe((response) => {
      console.log("response", response);
    }, (error=>{
      console.log("error", error);
    }));
  }

  buildForm() {
    const controls = {
      userDocument: ['', Validators.compose([
        Validators.required
      ])]
    };
    this.reservationsForm = this.formBuilder.group(controls);
  }

  searchFlights(event) {
  	event.preventDefault();
  	console.log("flight", this.reservationsForm.value.userDocument);
  }

}
