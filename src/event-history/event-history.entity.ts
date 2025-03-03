import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventPage } from '../events/events.entity';

@Entity('event_history')
export class EventHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EventPage, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_page_id' })
  eventPage: EventPage;

  @Column({ type: 'jsonb', nullable: false })
  previousPageJson: object;

  @Column({ type: 'jsonb', nullable: false })
  changedPageJson: object;

  @Column({ type: 'text', nullable: true })
  changeReason: string; // 변경 사유 (선택 사항)

  @Column({ type: 'text', nullable: true })
  testCol: string; // 변경 사유 (선택 사항)

  @Column({ type: 'varchar', length: 100 })
  changedBy: string; // 변경한 사용자

  @CreateDateColumn({ name: 'changed_at' })
  changedAt: Date; // 변경 일자
}
