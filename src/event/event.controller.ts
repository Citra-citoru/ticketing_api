import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDTO } from './dto/create-event.dto';
import { FilterEventDTO } from './dto/filter-event.dto';

@Controller('organization/events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get('/')
  async getEvents(@Query() filterEventDTO: FilterEventDTO) {
    if (Object.keys(filterEventDTO).length) {
      const filteredEvents =
        await this.eventService.getFilteredEvents(filterEventDTO);
      return filteredEvents;
    } else {
      const allEvents = await this.eventService.getAllEvents();
      return allEvents;
    }
  }

  @Get('/:id')
  async getEvent(@Param('id') id: string) {
    const event = await this.eventService.getEvent(id);
    if (!event) throw new NotFoundException('Event does not exist!');
    return event;
  }

  @Post('/')
  async addEvent(@Body() createEventDTO: CreateEventDTO) {
    const event = await this.eventService.addEvent(createEventDTO);
    return event;
  }

  @Put('/:id')
  async updateEvent(
    @Param('id') id: string,
    @Body() createEventDTO: CreateEventDTO,
  ) {
    const event = await this.eventService.updateEvent(id, createEventDTO);
    if (!event) throw new NotFoundException('Event does not exist!');
    return event;
  }

  @Delete('/:id')
  async deleteEvent(@Param('id') id: string) {
    const event = await this.eventService.deleteEvent(id);
    if (!event) throw new NotFoundException('Event does not exist');
    return event;
  }
}
