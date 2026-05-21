import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Reservation } from './reservation.entity';

/**
 * Client - Client de services
 * Cherche et réserve des services auprès des prestataires
 * Les commentaires/avis sont maintenant liés via Reservation -> Avis
 */
@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  idClient: string;

  @OneToOne(() => User, (user) => user.clientProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idUtilisateur' })
  user: User;

  @Column()
  idUtilisateur: string;

  @Column({ nullable: true })
  preferencesRecherche?: string;

  // Relations
  @OneToMany(
    () => Reservation,
    (reservation) => reservation.client,
    { onDelete: 'CASCADE', eager: false },
  )
  reservations?: Reservation[];

  // Methods
  /**
   * Recherche des services selon des critères
   */
  rechercherService(criteres: any): any[] {
    return [];
  }

  /**
   * Réserve un service
   */
  reserver(service: any): void {
    // Implémentation dans le service
  }

  /**
   * Ajoute un commentaire via Avis après une réservation complétée
   * @deprecated Utiliser Reservation.ajouterAvis() à la place
   */
  ajouterCommentaire(commentaire: string): void {
    // Implémentation migrer vers le service Avis
  }
}
