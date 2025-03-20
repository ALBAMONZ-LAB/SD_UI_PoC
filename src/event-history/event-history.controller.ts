import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { EventHistoryService } from './event-history.service';
import { EventHistoryResponseDto } from './dto/event-history-response.dto';

@ApiTags('Event History')
@Controller('event-history')
export class EventHistoryController {
  constructor(private readonly eventHistoryService: EventHistoryService) {}

  @Get()
  @ApiOperation({ summary: '이벤트 히스토리 조회', description: '특정 eventPageId의 이벤트 변경 내역을 조회합니다.' })
  async getEventHistory(@Query('eventId') eventId: number): Promise<EventHistoryResponseDto[]> {
    return this.eventHistoryService.getEventHistory(eventId);
  }
}
