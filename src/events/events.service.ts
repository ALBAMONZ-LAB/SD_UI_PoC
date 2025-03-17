import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventPageInput } from './dto/create-event.dto';
import { EventPageResponse } from './dto/event-page-response.dto';
import { EventPage, EventPageIdTitle } from './events.entity';
import { UpdateEventPageInput } from './dto/update-event.dto';

@Injectable()
export class EventPageService {
  constructor(
    @InjectRepository(EventPage)
    private readonly eventPageRepository: Repository<EventPage>,
  ) {}

  // 모든 이벤트 페이지의 ID 가져오기
  async getEventPageIds(): Promise<EventPageIdTitle[]> {
    const eventPages = await this.eventPageRepository.find({
      select: ['eventId', 'eventTitle', 'createdAt'],
    });

    return eventPages.map(page => ({
      eventId: page.eventId,
      eventTitle: page.eventTitle,
      createdAt: page.createdAt,
    }));
  }

  // 페이지네이션 적용하여 이벤트 ID 목록 가져오기
  async getPaginatedEventPageIds(pageIndex: number, pageRow: number): Promise<EventPageIdTitle[]> {
    const adjustedPageIndex = Math.max(0, pageIndex - 1);
    const eventPages = await this.eventPageRepository.find({
      select: ['eventId', 'eventTitle', 'createdAt'],
      order: { createdAt: 'DESC' },
      skip: adjustedPageIndex * pageRow,
      take: pageRow,
    });

    return eventPages.map(page => ({
      eventId: page.eventId,
      eventTitle: page.eventTitle,
      createdAt: page.createdAt,
    }));
  }

  // 특정 이벤트 페이지 조회 (Query)
  async getEventPageComponents(eventId: number): Promise<EventPage> {
    const eventPage = await this.eventPageRepository.findOne({ where: { eventId } });

    if (!eventPage) {
      throw new NotFoundException(`Event Page with eventId ${eventId} not found`);
    }

    return eventPage;
  }

  // 이벤트 페이지 생성 (Mutation)
  async create(createEventPageInput: CreateEventPageInput): Promise<EventPageResponse> {
    const newEventPage = this.eventPageRepository.create({
      ...createEventPageInput,
      pageJson: JSON.parse(createEventPageInput.pageJson) as Record<string, any>, // JSON 변환
    });

    const savedEventPage = await this.eventPageRepository.save(newEventPage);

    return {
      success: true,
      message: 'Event page created successfully',
      data: savedEventPage,
    };
  }

  // 이벤트 페이지 수정
  async update(updateEventPageInput: UpdateEventPageInput): Promise<EventPageResponse> {
    const { eventId, pageJson, ...rest } = updateEventPageInput;

    // 기존 페이지 조회
    const existingPage = await this.eventPageRepository.findOne({ where: { eventId } });
    if (!existingPage) {
      return {
        success: false,
        message: 'Event page not found',
      };
    }

    const updated = await this.eventPageRepository.save({
      ...existingPage,
      ...rest,
      pageJson: JSON.parse(pageJson),
    });

    return {
      success: true,
      message: 'Event page updated successfully',
      data: updated,
    };
  }
}
