export class Flight {
  id:string;
  numberFlight:string;
  company:string;
  origin:{
    id: string;
    city: string;
    country: string;
    date: Date;
  };
  destination:{
    id: string;
    city: string;
    country: string;
    date: Date;
  };
}
