import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Prestataire } from './prestataire.entity';
import { Categorie } from './categorie.entity';
import { Region } from './region.entity';
import { Reservation } from './reservation.entity';
import { ServiceCategorie } from './service-categorie.entity';

@Entity('services')
@Index(['idPrestataire'])
@Index(['estValide'])
export class Service {
  @PrimaryGeneratedColumn('uuid')
  idService: string;

  @Column()
  titre: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float' })
  prix: number;

  @Column({ type: 'text' })
  experienceRequise: string;

  @Column({ default: true })
  estValide: boolean;

  @CreateDateColumn()
  dateCreation: Date;

  @UpdateDateColumn()
  dateModification: Date;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ type: 'int', default: 0 })
  nombreCommandes: number;

  @Column({ type: 'float', default: 0 })
  tauxSatisfaction: number;

  // Relations
  @ManyToOne(() => Prestataire, (prestataire) => prestataire.services, {
    onDelete: 'CASCADE',
  })
  prestataire: Prestataire;

  @Column()
  idPrestataire: string;

  // Relation avec categories via ServiceCategorie (composition)
  @OneToMany(
    () => ServiceCategorie,
    (serviceCategorie) => serviceCategorie.service,
    { cascade: true, onDelete: 'CASCADE' },
  )
  serviceCategories: ServiceCategorie[];

  // Relation ManyToMany avec Region (agrégation)
  @ManyToMany(() => Region, (region) => region.services)
  @JoinTable({
    name: 'service_region',
    joinColumn: { name: 'idService', referencedColumnName: 'idService' },
    inverseJoinColumn: { name: 'idRegion', referencedColumnName: 'idRegion' },
  })
  regions: Region[];

  // Relation avec Reservation
  @OneToMany(
    () => Reservation,
    (reservation) => reservation.service,
    { onDelete: 'CASCADE' },
  )
  reservations?: Reservation[];

  // Relation avec FicheService
  @OneToMany(() => require('./fiche-service.entity').FicheService, (fiche: any) => fiche.service, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  fiches?: any[];

  // Methods
  /**
   * Calcule la disponibilité du service basée sur les disponibilités du Prestataire
   * et les réservations existantes
   */
  calculDispo(): boolean {
    // Logique : Vérifier si le prestataire a des créneaux disponibles
    // et que le service n'est pas réservé à ce moment
    return this.estValide && (this.prestataire?.disponibilites?.length ?? 0) > 0;
  }

  /**
   * Réserve le service pour une date/créneau donné
   */
  reserver(dateReservation: Date): Reservation | null {
    // Implémentation dans le service
    return null;
  }
}
