import { BaseEntityCustom } from 'src/utils/entity/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Club } from './club.entity';

@Entity({ name: 'events' })
export class Event extends BaseEntityCustom {
  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('timestamp', { nullable: true, default: null })
  scheduledAt: Date;

  @Column('int', { nullable: true })
  clubId: number;

  @ManyToOne(() => Club, (_) => _.events, { nullable: true })
  @JoinColumn({ name: 'clubId' })
  club: Club;
}
