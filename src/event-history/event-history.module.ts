import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventHistory } from './event-history.entity';
import { EventHistoryService } from './event-history.service';
import { EventHistoryResolver } from './event-history.resolver';
import { EventPage } from '../events/events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventHistory, EventPage])],
  providers: [EventHistoryService, EventHistoryResolver],
  exports: [EventHistoryService],
})
export class EventHistoryModule {}
