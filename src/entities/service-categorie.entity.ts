import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Service } from './service.entity';
import { Categorie } from './categorie.entity';

/**
 * ServiceCategorie (S.Categorie) - Entité de composition
 * Représente la relation de composition entre Categorie et Service
 * Relation : Categorie --composition--> ServiceCategorie <--agrégation-- Service
 */
@Entity('service_categories')
@Index(['idCategorie'])
@Index(['idService'])
@Index(['idCategorie', 'idService'], { unique: true })
export class ServiceCategorie {
  @PrimaryGeneratedColumn('uuid')
  idServiceCategorie: string;

  @Column()
  nom: string; // Nom spécifique pour cette catégorisation du service

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn()
  dateCreation: Date;

  // Relations
  @ManyToOne(() => Categorie, (categorie) => categorie.serviceCategories, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'idCategorie' })
  categorie: Categorie;

  @Column()
  idCategorie: string;

  @ManyToOne(() => Service, (service) => service.serviceCategories, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'idService' })
  service: Service;

  @Column()
  idService: string;
}
