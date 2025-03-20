import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventPage } from './events.entity';
import { EventPageResolver } from './events.resolver';
import { EventPageService } from './events.service';
import { EventPageController } from './event.controller';
import { EventHistoryModule } from '../event-history/event-history.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventPage]), EventHistoryModule],
  providers: [EventPageResolver, EventPageService],
  controllers: [EventPageController],
})
export class EventsModule {}
