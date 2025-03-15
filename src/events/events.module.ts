import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventPage } from './events.entity';
import { EventPageResolver } from './events.resolver';
import { EventPageService } from './events.service';
import { EventPageController } from './event.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventPage])],
  providers: [EventPageResolver, EventPageService],
  controllers: [EventPageController],
})
export class EventsModule {}
