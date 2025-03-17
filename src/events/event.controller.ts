import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { EventPageService } from './events.service';
import { CreateEventPageInput } from './dto/create-event.dto';
import { EventPageResponse } from './dto/event-page-response.dto';
import { EventPageIdTitle } from './events.entity';

@ApiTags('Event Page') // Swagger에서 REST API 문서화
@Controller('event-pages') // REST API 엔드포인트 추가
export class EventPageController {
  constructor(private readonly eventPageService: EventPageService) {}

  @Get()
  @ApiOperation({
    summary: '페이징된 이벤트 페이지 ID 조회',
    description: 'pageIndex와 pageRow를 사용하여 페이징된 데이터를 가져옵니다.',
  })
  @ApiQuery({ name: 'pageIndex', required: true, type: Number, description: '페이지 번호' })
  @ApiQuery({ name: 'pageRow', required: true, type: Number, description: '한 페이지당 보여줄 행 수' })
  async getPaginatedEventPageIds(
    @Query('pageIndex') pageIndex: number,
    @Query('pageRow') pageRow: number,
  ): Promise<EventPageIdTitle[]> {
    return this.eventPageService.getPaginatedEventPageIds(pageIndex, pageRow);
  }

  @Get('/all')
  @ApiOperation({ summary: '모든 이벤트 페이지 ID 조회', description: '이벤트 페이지의 ID 목록을 가져옵니다.' })
  async getEventPageIds(): Promise<EventPageIdTitle[]> {
    return this.eventPageService.getEventPageIds();
  }

  @Post('create')
  @ApiOperation({ summary: '이벤트 페이지 생성', description: '이벤트 페이지 데이터를 생성합니다.' })
  @ApiBody({ type: CreateEventPageInput })
  async createEventPage(@Body() createEventPageInput: CreateEventPageInput): Promise<EventPageResponse> {
    return this.eventPageService.create(createEventPageInput);
  }
}
