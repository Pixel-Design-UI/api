import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>)
  { }

  /**
   * Returns all events
   * @returns A list of events
   */
  public async findAll() {
    const allEvents = await this.eventRepository.find();
    console.log(allEvents)
    if (allEvents.length === 0) throw new NotFoundException('No events found');

    return allEvents;
  }
}
