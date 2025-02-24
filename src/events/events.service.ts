import { Injectable } from '@nestjs/common';
import { ComponentResponse } from './models/event.model';
import { eventData } from './data/eventData';

@Injectable()
export class EventsService {
  async getEventPageComponents(eventId: string): Promise<ComponentResponse> {
    return {
      ...eventData,
      eventId,
    };
  }
}
