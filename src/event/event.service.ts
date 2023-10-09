import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventDTO } from './dto/create-event.dto';
import { FilterEventDTO } from './dto/filter-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event')
    private readonly eventModel: Model<EventDocument>,
  ) {}

  async getFilteredEvents(filterEventDTO: FilterEventDTO): Promise<Event[]> {
    const { category, search } = filterEventDTO;
    let events = await this.getAllEvents();

    if (search) {
      events = events.filter(
        (event) =>
          event.name.includes(search) || event.description.includes(search),
      );
    }

    if (category) {
      events = events.filter((event) => event.category === category);
    }

    return events;
  }

  async getAllEvents(): Promise<Event[]> {
    const events = await this.eventModel.find().exec();
    return events;
  }

  async getEvent(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).exec();
    return event;
  }

  async addEvent(createEventDTO: CreateEventDTO): Promise<Event> {
    const newEvent = await this.eventModel.create(createEventDTO);
    return newEvent.save();
  }

  async updateEvent(
    id: string,
    createEventDTO: CreateEventDTO,
  ): Promise<Event> {
    const updatedEvent = await this.eventModel.findByIdAndUpdate(
      id,
      createEventDTO,
      { new: true },
    );
    return updatedEvent;
  }

  async deleteEvent(id: string): Promise<any> {
    const deletedEvent = await this.eventModel.findByIdAndRemove(id);
    return deletedEvent;
  }
}
