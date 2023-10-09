import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  location: string;

  @Prop()
  start_date: Date;

  @Prop()
  end_date: Date;

  @Prop()
  ticket_qty: number;

  @Prop()
  price: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);
