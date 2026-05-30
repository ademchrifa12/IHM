import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categorie } from './categorie.entity';

@Entity({ name: 'sous_categories' })
export class SousCategorie {
  @PrimaryGeneratedColumn({ name: 'id_sous_categorie' })
  idSousCategorie!: number;

  @ManyToOne(() => Categorie, (c) => c.sousCategories, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'id_categorie' })
  categorie!: Categorie;

  @Column({ length: 100 })
  nom!: string;
}
