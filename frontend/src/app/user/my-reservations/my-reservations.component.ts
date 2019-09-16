import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../user.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {
  reservations: Reservation[];
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

  searchTickets(event) {
  	event.preventDefault();
  	const userDocument = this.reservationsForm.value.userDocument;
    if (!!userDocument) {
      this.userService.getTickets(userDocument).subscribe((response) => {
        if (!!response) {
          console.log("response", response);
          this.reservations = response.reservations;
        }
      }, (error=>{
        console.log("error", error);
      }));
    } else {
      alert("Por favor, introduce un documento");
    }    	
  }

}
