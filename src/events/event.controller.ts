import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { EventPageService } from './events.service';
import { CreateEventPageInput } from './dto/create-event.dto';
import { EventPageResponse } from './dto/event-page-response.dto';
import { EventPageIdTitle } from './events.entity';

@ApiTags('Event Page') // Swagger에서 REST API 문서화
@Controller('event-pages') // REST API 엔드포인트 추가
export class EventPageController {
  constructor(private readonly eventPageService: EventPageService) {}

  @Get('ids')
  @ApiOperation({ summary: '모든 이벤트 페이지 ID 조회 (REST)', description: '이벤트 페이지의 ID 목록을 가져옵니다.' })
  async getEventPageIds(): Promise<EventPageIdTitle[]> {
    return this.eventPageService.getEventPageIds();
  }

  @Get('paginated')
  @ApiOperation({
    summary: '페이징된 이벤트 페이지 ID 조회 (REST)',
    description: 'pageIndex와 pageRow를 사용하여 페이징된 데이터를 가져옵니다.',
  })
  async getPaginatedEventPageIds(
    @Query('pageIndex') pageIndex: number,
    @Query('pageRow') pageRow: number,
  ): Promise<EventPageIdTitle[]> {
    return this.eventPageService.getPaginatedEventPageIds(pageIndex, pageRow);
  }

  @Post('create')
  @ApiOperation({ summary: '이벤트 페이지 생성 (REST)', description: '이벤트 페이지 데이터를 생성합니다.' })
  @ApiBody({ type: CreateEventPageInput })
  async createEventPage(@Body() createEventPageInput: CreateEventPageInput): Promise<EventPageResponse> {
    return this.eventPageService.create(createEventPageInput);
  }
}
