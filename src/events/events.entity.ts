import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event_pages')
export class EventPage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int', unique: true})
    eventId: number

    @Column({type: 'jsonb', nullable: false })
    pageJson: object

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date
}