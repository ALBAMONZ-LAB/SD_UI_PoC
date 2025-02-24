import { Resolver, Query, Args } from '@nestjs/graphql';
import { ComponentResponse } from './models/event.model';
import { EventsService } from './events.service';

@Resolver(() => ComponentResponse)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Query(() => ComponentResponse, { name: 'getEventPageComponents' })
  async getEventPageComponents(
    @Args('eventId') eventId: string
  ): Promise<ComponentResponse> {
    return this.eventsService.getEventPageComponents(eventId);
  }
}
