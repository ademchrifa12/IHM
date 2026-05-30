import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Prestataire } from './prestataire.entity';
import { Categorie } from './categorie.entity';
import { SousCategorie } from './sous-categorie.entity';

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn({ name: 'id_service' })
  idService!: number;

  @ManyToOne(() => Prestataire, (p) => p.services, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_prestataire' })
  prestataire!: Prestataire;

  @ManyToOne(() => Categorie, { eager: true })
  @JoinColumn({ name: 'id_categorie' })
  categorie!: Categorie;

  @ManyToOne(() => SousCategorie, { eager: true, nullable: true })
  @JoinColumn({ name: 'id_sous_categorie' })
  sousCategorie?: SousCategorie;

  @Column({ length: 200 }) titre!: string;
  @Column({ type: 'nvarchar', length: 2000, nullable: true }) description?: string;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 }) prix!: number;
}
