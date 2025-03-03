import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventPage } from './eventPage.entity';

@Entity('event_page_history')
export class EventPageHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EventPage, eventPage => eventPage.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_page_id' })
  event_page_id: number;

  @Column({ type: 'jsonb', nullable: false })
  previous_page_json: any;

  @Column({ type: 'jsonb', nullable: false })
  changed_page_json: any;

  @Column({ type: 'text', nullable: true })
  change_reason: string;

  @Column({ type: 'varchar', length: 100 })
  changed_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  changed_at: Date;
}
