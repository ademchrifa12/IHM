import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './client.entity';
import { Prestataire } from './prestataire.entity';
import { Service } from './service.entity';
import { StatutReservation } from '../common/enums';

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn({ name: 'id_reservation' })
  idReservation!: number;

  @ManyToOne(() => Client, { eager: true })
  @JoinColumn({ name: 'id_client' })
  client!: Client;

  @ManyToOne(() => Prestataire, { eager: true })
  @JoinColumn({ name: 'id_prestataire' })
  prestataire!: Prestataire;

  @ManyToOne(() => Service, { eager: true })
  @JoinColumn({ name: 'id_service' })
  service!: Service;

  @Column({ name: 'date_reservation', type: 'datetime2' })
  dateReservation!: Date;

  @Column({ type: 'varchar', length: 20, default: 'EN_ATTENTE' })
  statut!: StatutReservation;
}
