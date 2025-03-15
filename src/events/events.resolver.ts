import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { CreateEventPageInput } from './dto/create-event.dto';
import { EventPageResponse } from './dto/event-page-response.dto';
import { EventPage, EventPageIdTitle } from './events.entity';
import { EventPageService } from './events.service';

@Resolver(() => EventPage)
export class EventPageResolver {
  constructor(private readonly eventPageService: EventPageService) {}

  /** 모든 이벤트 Id 조회 */
  @Query(() => [EventPageIdTitle])
  async getEventPageIds(): Promise<EventPageIdTitle[]> {
    return this.eventPageService.getEventPageIds();
  }

  /**
   * 특정 이벤트 페이지 조회 (Query)
   * @param eventId 이벤트 ID
   * @returns 해당 eventId의 페이지 데이터
   */
  @Query(() => EventPage, { nullable: true })
  async getEventPageComponents(
    @Args('eventId') eventId: number, // GraphQL 인자 설정
  ): Promise<EventPage> {
    return this.eventPageService.getEventPageComponents(eventId);
  }

  /**
   * 이벤트 페이지 생성 (Mutation)
   * @param createEventPageInput 클라이언트에서 받은 입력 데이터 (DTO)
   * @returns 저장된 이벤트 페이지 데이터
   */
  @Mutation(() => EventPageResponse)
  async createEventPage(
    @Args('createEventPageInput') createEventPageInput: CreateEventPageInput,
  ): Promise<EventPageResponse> {
    return this.eventPageService.create(createEventPageInput);
  }
}
