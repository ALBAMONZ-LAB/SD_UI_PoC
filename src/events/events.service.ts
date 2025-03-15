import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventPageInput } from './dto/create-event.dto';
import { EventPageResponse } from './dto/event-page-response.dto';
import { EventPage, EventPageIdTitle } from './events.entity';

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
}
