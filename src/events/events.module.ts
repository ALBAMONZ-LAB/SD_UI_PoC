import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventPage } from './events.entity';
import { EventPageResolver } from './events.resolver';
import { EventPageService } from './events.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventPage]), // 엔티티 추가
  ],
  providers: [EventPageResolver, EventPageService],
})
export class EventsModule {}
