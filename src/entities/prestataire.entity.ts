import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Reservation } from './reservation.entity';
import { Service } from './service.entity';
import { Disponibilite } from './disponibilite.entity';

/**
 * Prestataire - Prestataire de services
 * Offre des services aux clients et gère ses disponibilités
 */
@Entity('prestataires')
@Index(['estVerifie'])
export class Prestataire {
  @PrimaryGeneratedColumn('uuid')
  idPrestataire: string;

  @OneToOne(() => User, (user) => user.prestaireProfile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idUtilisateur' })
  user: User;

  @Column()
  idUtilisateur: string;

  // Changement : note -> evaluationMoy (évaluation moyenne)
  @Column({ type: 'float', default: 0 })
  evaluationMoy: number;

  @Column({ default: 0 })
  nombreAvis: number;

  @Column({ type: 'text', nullable: true })
  experience?: string;

  @Column({ default: false })
  estVerifie: boolean;

  @Column({ nullable: true })
  certificationsUrl?: string;

  // Disponibilité par défaut (chaîne de configuration)
  @Column({ type: 'text', nullable: true })
  disponibleDef?: string;

  @CreateDateColumn()
  dateInscription: Date;

  // Relations
  @OneToMany(() => Service, (service) => service.prestataire, {
    onDelete: 'CASCADE',
    eager: false,
  })
  services?: Service[];

  @OneToMany(() => Reservation, (reservation) => reservation.prestataire, {
    onDelete: 'CASCADE',
    eager: false,
  })
  reservations?: Reservation[];

  // Relation OneToMany avec Disponibilité
  @OneToMany(() => Disponibilite, (disponibilite) => disponibilite.prestataire, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: false,
  })
  disponibilites?: Disponibilite[];

  // Methods
  /**
   * Définit les disponibilités du prestataire
   */
  definirDisponibilite(disponibilites: Disponibilite[]): void {
    this.disponibilites = disponibilites;
  }

  /**
   * Vérifie si le prestataire est disponible à une date/heure donnée
   */
  estDisponible(date: Date): boolean {
    if (!this.disponibilites || this.disponibilites.length === 0) {
      return false;
    }
    // Logique : Vérifier le jour et l'heure avec les disponibilités
    const jour = date.getDay();
    const heure = date.getHours();
    const minute = date.getMinutes();

    return this.disponibilites.some((dispo) => {
      if (!dispo.joursDisponibles.includes(jour)) return false;

      const [heureDebut, minDebut] = dispo.heureDebut.split(':').map(Number);
      const [heureFin, minFin] = dispo.heureFin.split(':').map(Number);

      const timeMinutes = heure * 60 + minute;
      const startMinutes = heureDebut * 60 + minDebut;
      const endMinutes = heureFin * 60 + minFin;

      return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
    });
  }

  /**
   * Propose un nouveau service
   */
  proposerService(service: Service): void {
    // Implémentation dans le service
  }

  /**
   * Gère le profil du prestataire
   */
  gererProfil(): void {
    // Implémentation dans le service
  }

  /**
   * Gère les services du prestataire
   */
  gererService(): void {
    // Implémentation dans le service
  }
}
