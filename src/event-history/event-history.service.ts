import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventHistory } from './event-history.entity';
import { Repository } from 'typeorm';
import { CreateEventHistoryInput } from './dto/create-event-history.input';
import { EventPage } from '../events/events.entity';

@Injectable()
export class EventHistoryService {
  constructor(
    @InjectRepository(EventHistory)
    private readonly eventHistoryRepository: Repository<EventHistory>,

    @InjectRepository(EventPage)
    private readonly eventPageRepository: Repository<EventPage>,
  ) {}

  // get event history data
  async getEventHistory(eventPageId: number): Promise<EventHistory[]> {
    const histories = await this.eventHistoryRepository.find({
      where: { eventPage: { id: eventPageId } },
      order: { changedAt: 'DESC' },
      relations: ['eventPage'],
    });

    if (!histories.length) {
      throw new NotFoundException(`No history found for event page with id ${eventPageId}`);
    }

    return histories;
  }
  // save event history data
  async createEventHistory(input: CreateEventHistoryInput): Promise<EventHistory> {
    const eventPage = await this.eventPageRepository.findOne({ where: { id: input.eventPageId } });

    if (!eventPage) {
      throw new NotFoundException(`Event page with id ${input.eventPageId} not found`);
    }

    const newHistory = this.eventHistoryRepository.create({
      eventPage,
      previousPageJson: JSON.parse(input.previousPageJson),
      changedPageJson: JSON.parse(input.changedPageJson),
      changeReason: input.changeReason,
      changedBy: input.changedBy,
      changedAt: new Date(),
    });

    return await this.eventHistoryRepository.save(newHistory);
  }
}
