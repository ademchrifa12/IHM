import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from './service.entity';

@Entity('fiches_services')
export class FicheService {
  @PrimaryGeneratedColumn('uuid')
  idFiche: string;

  @Column()
  titre: string;

  @Column({ type: 'float' })
  prix: number;

  @Column({ type: 'text' })
  categorieId: string;

  @Column({ type: 'text' })
  regionId: string;

  @Column({ type: 'text' })
  experienceRequise: string;

  @CreateDateColumn()
  dateCreation: Date;

  @UpdateDateColumn()
  dateModification: Date;

  @Column({ nullable: true })
  imageUrl?: string;

  // Relations
  @ManyToOne(() => Service, (service) => service.fiches, {
    onDelete: 'CASCADE',
  })
  service: Service;

  @Column()
  idService: string;
}
