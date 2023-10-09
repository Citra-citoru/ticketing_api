export class CreateEventDTO {
  name: string;
  description: string;
  category: string;
  location: string;
  start_date: Date;
  end_date: Date;
  ticket_qty: number;
  price: number;
}
