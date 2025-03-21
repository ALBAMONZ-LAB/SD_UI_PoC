import { Controller, Get, Post, Body, Query, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
import { EventPageService } from './events.service';
import { CreateEventPageInput } from './dto/create-event.dto';
import { EventPageResponse } from './dto/event-page-response.dto';
import { EventPage, EventPageIdTitle } from './events.entity';
import { PaginationQueryDto } from './dto/event-pages-query.dto';
import { UpdateEventPageInput } from './dto/update-event.dto';

@ApiTags('Event Page')
@Controller('event-pages')
export class EventPageController {
  constructor(private readonly eventPageService: EventPageService) {}

  @Get()
  @ApiOperation({
    summary: '페이징된 이벤트 페이지 ID 조회',
    description: 'pageIndex와 pageRow를 사용하여 페이징된 데이터를 가져옵니다.',
  })
  @ApiQuery({ name: 'pageIndex', required: true, type: Number, description: '페이지 번호' })
  @ApiQuery({ name: 'pageRow', required: true, type: Number, description: '한 페이지당 보여줄 행 수' })
  async getPaginatedEventPageIds(@Query() query: PaginationQueryDto): Promise<EventPageIdTitle[]> {
    const { pageIndex, pageRow } = query;
    return this.eventPageService.getPaginatedEventPageIds(pageIndex, pageRow);
  }

  @Get('/all')
  @ApiOperation({ summary: '모든 이벤트 페이지 ID 조회', description: '이벤트 페이지의 ID 목록을 가져옵니다.' })
  async getEventPageIds(): Promise<EventPageIdTitle[]> {
    return this.eventPageService.getEventPageIds();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 이벤트 페이지 조회',
    description: 'eventId로 특정 이벤트 페이지 데이터를 조회합니다.',
  })
  @ApiParam({ name: 'id', type: Number, description: '조회할 이벤트 페이지 ID' })
  async getEventPage(@Param('id', ParseIntPipe) id: number): Promise<EventPage> {
    return this.eventPageService.getEventPageComponents(id);
  }

  @Post('create')
  @ApiOperation({ summary: '이벤트 페이지 생성', description: '이벤트 페이지 데이터를 생성합니다.' })
  @ApiBody({ type: CreateEventPageInput })
  async createEventPage(@Body() createEventPageInput: CreateEventPageInput): Promise<EventPageResponse> {
    return this.eventPageService.create(createEventPageInput);
  }

  @Patch('update')
  @ApiOperation({ summary: '이벤트 페이지 수정', description: '기존 이벤트 페이지 데이터를 수정합니다.' })
  @ApiBody({ type: UpdateEventPageInput })
  async updateEventPage(@Body() updateEventPageInput: UpdateEventPageInput): Promise<EventPageResponse> {
    return this.eventPageService.update(updateEventPageInput);
  }
}
