import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { EventHistoryService } from './event-history.service';
import { EventHistory } from './event-history.entity';
import { CreateEventHistoryInput } from './dto/create-event-history.input';

@ApiTags('Event History')
@Controller('event-history')
export class EventHistoryController {
  constructor(private readonly eventHistoryService: EventHistoryService) {}

  @Get()
  @ApiOperation({ summary: '이벤트 히스토리 조회', description: '특정 eventPageId의 이벤트 변경 내역을 조회합니다.' })
  async getEventHistory(@Query('eventId') eventId: number): Promise<EventHistory[]> {
    return this.eventHistoryService.getEventHistory(eventId);
  }

  @Post('create')
  @ApiOperation({ summary: '이벤트 히스토리 생성', description: '이벤트 페이지의 변경 내역을 생성합니다.' })
  @ApiBody({ type: CreateEventHistoryInput })
  async createEventHistory(@Body() input: CreateEventHistoryInput): Promise<EventHistory> {
    return this.eventHistoryService.createEventHistory(input);
  }
}
