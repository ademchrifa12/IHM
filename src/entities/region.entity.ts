import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Index,
} from 'typeorm';
import { Service } from './service.entity';

@Entity('regions')
@Index(['nomRegion'], { unique: true })
export class Region {
  @PrimaryGeneratedColumn('uuid')
  idRegion: string;

  @Column({ unique: true })
  nomRegion: string;

  @Column({ default: true })
  estActive: boolean;

  // Relations
  @ManyToMany(() => Service, (service) => service.regions, {
    onDelete: 'CASCADE',
  })
  services: Service[];
}
