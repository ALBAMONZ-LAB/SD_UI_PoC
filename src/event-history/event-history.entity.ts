import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventPage } from '../events/events.entity';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
@Entity('event_history')
export class EventHistory {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => EventPage)
  @ManyToOne(() => EventPage, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_page_id' })
  eventPage: EventPage;

  @Field(() => GraphQLJSON)
  @Column({ type: 'jsonb', nullable: false })
  previousPageJson: object;

  @Field(() => GraphQLJSON)
  @Column({ type: 'jsonb', nullable: false })
  changedPageJson: object;

  @Field()
  @Column({ type: 'text', nullable: true })
  changeReason: string; // 변경 사유 (선택 사항)

  @Column({ type: 'text', nullable: true })
  testCol: string; // 변경 사유 (선택 사항)

  @Field()
  @Column({ type: 'varchar', length: 100 })
  changedBy: string; // 변경한 사용자

  @Field()
  @CreateDateColumn({ name: 'changed_at' })
  changedAt: Date; // 변경 일자
}
