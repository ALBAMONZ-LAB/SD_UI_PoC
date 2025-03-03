import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventHistory } from './event-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventHistory]), // 엔티티 추가
  ],
})
export class EventHistoryModule {}
