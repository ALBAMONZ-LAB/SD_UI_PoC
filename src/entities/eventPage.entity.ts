import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event_pages')
export class EventPage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  event_id: number;

  @Column({ type: 'jsonb', nullable: false })
  page_json: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
