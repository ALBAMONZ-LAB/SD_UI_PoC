import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventPage } from './events.entity';
import { EventsResolver } from './events.resolver';
import { EventsService } from './events.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventPage]), // 엔티티 추가
  ],
  providers: [EventsResolver, EventsService],
})
export class EventsModule {}
