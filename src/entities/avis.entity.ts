import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  TableInheritance,
  ChildEntity,
} from 'typeorm';
import { Reservation } from './reservation.entity';

export enum AvisType {
  COMMENTAIRE = 'commentaire',
  NOTE = 'note',
}

@Entity('avis')
@Index(['typeAvis'])
@Index(['idReservation'])
@Index(['dateCreation'])
@TableInheritance({ column: { type: 'varchar', name: 'typeAvis' } })
export class Avis {
  @PrimaryGeneratedColumn('uuid')
  idAvis: string;

  @Column({ type: 'int', nullable: true })
  note?: number; // Note sur 5

  @Column({ type: 'text', nullable: true })
  contenu?: string; // Contenu du commentaire

  @Column({
    type: 'enum',
    enum: AvisType,
    default: AvisType.COMMENTAIRE,
  })
  typeAvis: AvisType;

  @CreateDateColumn()
  dateCreation: Date;

  @UpdateDateColumn()
  dateModification: Date;

  @Column({ default: true })
  estVisible: boolean;

  @Column({ type: 'int', default: 0 })
  nombreSignalement: number;

  // Relations
  @ManyToOne(() => Reservation, (reservation) => reservation.avis, {
    onDelete: 'CASCADE',
  })
  reservation: Reservation;

  @Column()
  idReservation: string;
}
