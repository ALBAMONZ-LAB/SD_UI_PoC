import { Field, ID, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('event_pages') // TypeORM 테이블 매핑
export class EventPage {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  eventTitle: string;

  @Field(() => GraphQLJSON) // JSON은 GraphQL에서 String으로 변환해야 함
  @Column({ type: 'jsonb', nullable: false })
  pageJson: object;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

@ObjectType()
export class EventPageIdTitle {
  @Field()
  id: number;

  @Field()
  eventTitle: string;

  @Field()
  createdAt: Date;
}
