import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { ServiceCategorie } from './service-categorie.entity';

/**
 * Categorie - Catégories de services
 * Relation de composition avec ServiceCategorie
 * Une Catégorie compose plusieurs ServiceCategories
 */
@Entity('categories')
@Index(['nom'], { unique: true })
export class Categorie {
  @PrimaryGeneratedColumn('uuid')
  idCategorie: string;

  @Column({ unique: true })
  nom: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  iconUrl?: string;

  @Column({ default: true })
  estActive: boolean;

  // Relations
  // Composition : Une Catégorie compose plusieurs ServiceCategories
  @OneToMany(
    () => ServiceCategorie,
    (serviceCategorie) => serviceCategorie.categorie,
    { cascade: true, onDelete: 'CASCADE', eager: false },
  )
  serviceCategories: ServiceCategorie[];
}
