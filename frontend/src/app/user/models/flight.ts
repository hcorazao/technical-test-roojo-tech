export class Flight {
  id:string;
  numberFlight:string;
  price: number;
  company:string;
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
