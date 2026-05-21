import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

/**
 * Admin - Administrateur de la plateforme
 * Gère les contenus, les utilisateurs, et modère la plateforme
 */
@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  idAdmin: string;

  @OneToOne(() => User, (user) => user.adminProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idUtilisateur' })
  user: User;

  @Column()
  idUtilisateur: string;

  // Changement : dateDerniereActivite -> dateDernierConnect
  @Column({ type: 'timestamp', nullable: true })
  dateDernierConnect?: Date;

  @Column({ default: 'moderator' })
  niveau: string;

  @Column({ type: 'text', nullable: true })
  permissions?: string;

  @CreateDateColumn()
  dateNommation: Date;

  @UpdateDateColumn()
  dateModification: Date;

  // Methods
  /**
   * Valide le profil d'un utilisateur
   */
  validerProfil(utilisateur: any): void {
    // Implémentation dans le service
  }

  /**
   * Gère les catégories de services
   */
  gererCategories(categorie: any): void {
    // Implémentation dans le service
  }

  /**
   * Consulte le tableau de bord (statistiques)
   */
  consulterDash(): any {
    return {
      // Statistiques à implémenter
    };
  }

  /**
   * Supprime un commentaire
   */
  supprimerCommentaire(commentaireId: string): void {
    // Implémentation dans le service
  }
}
