import { BaseEntityCustom } from 'src/utils/entity/BaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Event } from './event.entity';

@Entity({ name: 'clubs' })
export class Club extends BaseEntityCustom {
  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => Event, (_) => _.club, { nullable: true })
  events: Event[];
}
