import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SousCategorie } from './sous-categorie.entity';

@Entity({ name: 'categories' })
export class Categorie {
  @PrimaryGeneratedColumn({ name: 'id_categorie' })
  idCategorie!: number;

  @Column({ length: 100, unique: true })
  nom!: string;

  @OneToMany(() => SousCategorie, (s) => s.categorie)
  sousCategories?: SousCategorie[];
}
