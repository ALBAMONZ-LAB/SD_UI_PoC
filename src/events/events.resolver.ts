import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { CreateEventPageInput } from './dto/create-event.dto';
import { EventPageResponse } from './dto/event-page-response.dto';
import { EventPage, EventPageIdTitle } from './events.entity';
import { EventPageService } from './events.service';
import { UpdateEventPageInput } from './dto/update-event.dto';

@Resolver(() => EventPage)
export class EventPageResolver {
  constructor(private readonly eventPageService: EventPageService) {}
  /** 모든 이벤트 Id 조회 */
  @Query(() => [EventPageIdTitle])
  async getEventPageIds(): Promise<EventPageIdTitle[]> {
    return this.eventPageService.getEventPageIds();
  }

  /** 페이지네이션이 필요한 경우 이벤트 ID 목록 조회 */
  @Query(() => [EventPageIdTitle], { name: 'getPaginatedEventPageIds' })
  async getPaginatedEventPageIds(
    @Args('pageIndex', { type: () => Int }) pageIndex: number,
    @Args('pageRow', { type: () => Int }) pageRow: number,
  ): Promise<EventPageIdTitle[]> {
    return this.eventPageService.getPaginatedEventPageIds(pageIndex, pageRow);
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

  /** 이벤트 페이지 수정
   * @param updateEventPageInput 클라이언트에서 받은 입력 데이터 (DTO)
   * @returns 수정된 이벤트 페이지 데이터
   * */
  @Mutation(() => EventPageResponse)
  async updateEventPage(
    @Args('updateEventPageInput') updateEventPageInput: UpdateEventPageInput,
  ): Promise<EventPageResponse> {
    return this.eventPageService.update(updateEventPageInput);
  }
}
