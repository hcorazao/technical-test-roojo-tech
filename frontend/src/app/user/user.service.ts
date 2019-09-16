// Angular
import { Injectable, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Modules 
import { BehaviorSubject } from 'rxjs';

// Settings
import { environment } from '../../environments/environment';

// Models


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getFlights() {
    return this.http.get<any>(`${this.baseUrl}user/get-flights`);
  }

  getTickets(userDocumentId: string) {
    return this.http.post<any>(`${this.baseUrl}user/get-tickets`, userDocumentId);
  }

  bookTicket(user: any, flightId: string) {
    const request = {
      user: user,
      flightId: flightId
    }
    return this.http.post<any>(`${this.baseUrl}user/book-ticket`, request);
  }

}
