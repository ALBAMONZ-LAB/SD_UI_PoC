import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventPageInput } from './dto/create-event.dto';
import { EventPageResponse } from './dto/event-page-response.dto';
import { EventPage, EventPageIdTitle } from './events.entity';
import { UpdateEventPageInput } from './dto/update-event.dto';
import { EventHistoryService } from '../event-history/event-history.service';

@Injectable()
export class EventPageService {
  constructor(
    @InjectRepository(EventPage)
    private readonly eventPageRepository: Repository<EventPage>,

    private readonly eventHistoryService: EventHistoryService,
  ) {}

  // 모든 이벤트 페이지의 ID 가져오기
  async getEventPageIds(): Promise<EventPageIdTitle[]> {
    const eventPages = await this.eventPageRepository.find({
      select: ['id', 'eventTitle', 'createdAt'],
    });

    return eventPages.map(page => ({
      id: page.id,
      eventTitle: page.eventTitle,
      createdAt: page.createdAt,
    }));
  }

  // 페이지네이션 적용하여 이벤트 ID 목록 가져오기
  async getPaginatedEventPageIds(
    pageIndex: number,
    pageRow: number,
    order: 'ASC' | 'DESC' = 'DESC',
  ): Promise<EventPageIdTitle[]> {
    const adjustedPageIndex = Math.max(0, pageIndex - 1);
    const eventPages = await this.eventPageRepository.find({
      select: ['id', 'eventTitle', 'createdAt'],
      order: { createdAt: 'DESC' },
      skip: adjustedPageIndex * pageRow,
      take: pageRow,
    });

    return eventPages.map(page => ({
      id: page.id,
      eventTitle: page.eventTitle,
      createdAt: page.createdAt,
    }));
  }

  // 특정 이벤트 페이지 조회 (Query)

  async getEventPageComponents(id: number): Promise<EventPage> {
    try {
      const eventPage = await this.eventPageRepository.findOne({ where: { id } });

      if (!eventPage) {
        throw new NotFoundException(`Event Page with id ${id} not found`);
      }

      return eventPage;
    } catch (error) {
      console.error('getEventPageComponents Error:', error);
      throw new InternalServerErrorException('Failed to fetch event page');
    }
  }

  // 이벤트 페이지 생성 (Mutation)
  async create(createEventPageInput: CreateEventPageInput): Promise<EventPageResponse> {
    const { pageJson, ...rest } = createEventPageInput;

    if (!pageJson) {
      throw new BadRequestException('pageJson is required and cannot be empty');
    }

    let parsedJson: Record<string, any>;

    try {
      parsedJson = JSON.parse(pageJson) as Record<string, unknown>;
    } catch (e) {
      console.error('JSON.parse error:', e);
      throw new BadRequestException('pageJson must be a valid JSON string');
    }

    const newEventPage = this.eventPageRepository.create({
      ...rest,
      pageJson: parsedJson,
    });

    // create new event page
    const savedEventPage = await this.eventPageRepository.save(newEventPage);

    // create event history data automatically
    await this.eventHistoryService.saveEventHistory({
      eventPage: newEventPage,
      previousPageJson: {},
      changedPageJson: parsedJson,
      changeReason: 'initial create',
      changedBy: 'system',
    });

    return {
      success: true,
      message: 'Event page created successfully',
      data: savedEventPage,
    };
  }

  // 이벤트 페이지 수정
  async update(
    id: number,
    updateEventPageInput: UpdateEventPageInput,
    changeReason?: string,
    changedBy?: string,
  ): Promise<EventPageResponse> {
    const { pageJson, ...rest } = updateEventPageInput;

    // 기존 페이지 조회
    const existingPage = await this.eventPageRepository.findOne({ where: { id } });
    if (!existingPage) {
      return {
        success: false,
        message: 'Event page not found',
      };
    }

    const parsedPageJson: Record<string, any> = JSON.parse(pageJson);
    const previousJson = existingPage.pageJson;

    // update event page data
    const updated = await this.eventPageRepository.save({
      ...existingPage,
      ...rest,
      pageJson: parsedPageJson,
    });

    // update event history data automatically
    await this.eventHistoryService.saveEventHistory({
      eventPage: updated,
      previousPageJson: previousJson,
      changedPageJson: parsedPageJson,
      changeReason: changeReason || '-',
      changedBy: changedBy || '-',
    });

    return {
      success: true,
      message: 'Event page updated successfully',
      data: updated,
    };
  }
}
