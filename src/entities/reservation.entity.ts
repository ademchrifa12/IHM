import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm';
import { Client } from './client.entity';
import { Prestataire } from './prestataire.entity';
import { Service } from './service.entity';
import { Disponibilite } from './disponibilite.entity';
import { Avis } from './avis.entity';

export enum ReservationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

/**
 * Reservation - Classe associative reliant Client et Service
 * Représente une réservation de service effectuée par un client auprès d'un prestataire
 * Une réservation peut contenir plusieurs avis (commentaires, notes)
 */
@Entity('reservations')
@Index(['idClient'])
@Index(['idPrestataire'])
@Index(['statut'])
@Index(['dateReservation'])
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  idReservation: string;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  statut: ReservationStatus;

  @Column({ type: 'timestamp' })
  dateReservation: Date;

  @Column({ type: 'timestamp', nullable: true })
  dateExecution?: Date;

  @Column({ type: 'float' })
  prix: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn()
  dateCreation: Date;

  @UpdateDateColumn()
  dateModification: Date;

  // Relations
  @ManyToOne(() => Client, (client) => client.reservations, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'idClient' })
  client: Client;

  @Column()
  idClient: string;

  @ManyToOne(() => Prestataire, (prestataire) => prestataire.reservations, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'idPrestataire' })
  prestataire: Prestataire;

  @Column()
  idPrestataire: string;

  @ManyToOne(() => Service, (service) => service.reservations, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'idService' })
  service: Service;

  @Column()
  idService: string;

  // Relation avec Disponibilité (créneau dans lequel le service est prévu)
  @ManyToOne(() => Disponibilite, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: false,
  })
  @JoinColumn({ name: 'idDisponibilite' })
  disponibilite?: Disponibilite;

  @Column({ nullable: true })
  idDisponibilite?: string;

  // Relation OneToMany avec Avis (commentaires et notes)
  @OneToMany(() => Avis, (avis) => avis.reservation, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: false,
  })
  avis?: Avis[];

  // Helper methods
  /**
   * Vérifie si la réservation est terminée et peut recevoir des avis
   */
  peutAvoirAvis(): boolean {
    return this.statut === ReservationStatus.COMPLETED;
  }

  /**
   * Ajoute un avis à la réservation
   */
  ajouterAvis(avis: Avis): void {
    if (!this.avis) {
      this.avis = [];
    }
    this.avis.push(avis);
  }
}
