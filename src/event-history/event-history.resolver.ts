import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { EventHistory } from './event-history.entity';
import { EventHistoryService } from './event-history.service';
import { CreateEventHistoryInput } from './dto/create-event-history.input';

@Resolver(() => EventHistory)
export class EventHistoryResolver {
  constructor(private readonly eventHistoryService: EventHistoryService) {}

  /** event history Query */
  @Query(() => [EventHistory])
  async getEventHistory(@Args('eventPageId') eventPageId: number): Promise<EventHistory[]> {
    return this.eventHistoryService.getEventHistory(eventPageId);
  }

  @Mutation(() => EventHistory)
  async createEventHistory(@Args('createEventHistoryInput') input: CreateEventHistoryInput): Promise<EventHistory> {
    return this.eventHistoryService.createEventHistory(input);
  }
}
