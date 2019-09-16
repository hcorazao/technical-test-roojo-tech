export class Reservation {
  id: string;
  userDocumentId: string;
  reservationDate: string;
  price: number;
  numberFlight: string;
  origin:{
    id: string;
    city: string;
    country: string;
    date: string;
  };
  destination:{
    id: string;
    city: string;
    country: string;
    date: string;
  };
}
