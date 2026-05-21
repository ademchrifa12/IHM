import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Prestataire } from './prestataire.entity';

/**
 * Disponibilité - Créneaux disponibles des Prestataires
 * Représente les périodes et créneaux horaires lors lesquels un Prestataire peut être contacté/réserver
 */
@Entity('disponibilites')
@Index(['idPrestataire'])
@Index(['idPrestataire', 'joursDisponibles'])
export class Disponibilite {
  @PrimaryGeneratedColumn('uuid')
  idDisponibilite: string;

  @Column({
    type: 'simple-array',
    comment: 'Jours disponibles (0=Lundi, 1=Mardi, ... 6=Dimanche)',
  })
  joursDisponibles: number[]; // [0, 1, 2, 3, 4] pour Lun-Ven

  @Column({ type: 'time' })
  heureDebut: string; // Format HH:MM

  @Column({ type: 'time' })
  heureFin: string; // Format HH:MM

  @Column({ default: true })
  estActive: boolean;

  @Column({ type: 'text', nullable: true })
  notes?: string; // Notes spéciales sur la disponibilité

  @CreateDateColumn()
  dateCreation: Date;

  @UpdateDateColumn()
  dateModification: Date;

  // Relations
  @ManyToOne(() => Prestataire, (prestataire) => prestataire.disponibilites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idPrestataire' })
  prestataire: Prestataire;

  @Column()
  idPrestataire: string;
}
