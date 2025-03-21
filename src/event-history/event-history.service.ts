import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventHistory } from './event-history.entity';
import { Repository } from 'typeorm';
import { CreateEventHistoryInput } from './dto/create-event-history.input';
import { EventPage } from '../events/events.entity';
import { EventHistoryResponseDto } from './dto/event-history-response.dto';

@Injectable()
export class EventHistoryService {
  constructor(
    @InjectRepository(EventHistory)
    private readonly eventHistoryRepository: Repository<EventHistory>,

    @InjectRepository(EventPage)
    private readonly eventPageRepository: Repository<EventPage>,
  ) {}

  // get eventPageId's history data
  async getEventHistory(id: number): Promise<EventHistoryResponseDto[]> {
    const histories = await this.eventHistoryRepository.find({
      where: { eventPage: { id: id } },
      order: { changedAt: 'DESC' },
      relations: ['eventPage'],
    });

    if (!histories.length) {
      throw new NotFoundException(`No history found for event page with id ${id}`);
    }

    return histories.map(history => ({
      id: history.id,
      eventPage: {
        id: history.eventPage.id,
        eventTitle: history.eventPage.eventTitle,
        changedAt: history.eventPage.createdAt,
      },
      previousPageJson: history.previousPageJson,
      changedPageJson: history.changedPageJson,
      changeReason: history.changeReason,
      changedBy: history.changedBy,
      changedAt: history.changedAt,
    }));
  }

  // save event history data
  async saveEventHistory(params: {
    eventPage: EventPage;
    previousPageJson: object;
    changedPageJson: object;
    changeReason: string;
    changedBy: string;
  }): Promise<EventHistory> {
    const newHistory = this.eventHistoryRepository.create({
      eventPage: params.eventPage,
      previousPageJson: params.previousPageJson,
      changedPageJson: params.changedPageJson,
      changeReason: params.changeReason,
      changedBy: params.changedBy,
      changedAt: new Date(),
    });

    return await this.eventHistoryRepository.save(newHistory);
  }

  // save event history data
  async createEventHistory(input: CreateEventHistoryInput): Promise<EventHistory> {
    const eventPage = await this.eventPageRepository.findOne({ where: { id: input.id } });

    if (!eventPage) {
      throw new NotFoundException(`Event page with id ${input.id} not found`);
    }

    if (!input.previousPageJson || !input.changedPageJson) {
      throw new BadRequestException('previousPageJson and changedPageJson are required and cannot be empty');
    }

    let previousJson: Record<string, unknown>;
    let changedJson: Record<string, unknown>;

    try {
      previousJson = JSON.parse(input.previousPageJson) as Record<string, unknown>;
      changedJson = JSON.parse(input.changedPageJson) as Record<string, unknown>;
    } catch (_) {
      throw new BadRequestException('Invalid JSON string provided');
    }

    return await this.saveEventHistory({
      eventPage,
      previousPageJson: previousJson,
      changedPageJson: changedJson,
      changeReason: input.changeReason,
      changedBy: input.changedBy,
    });
  }
}
