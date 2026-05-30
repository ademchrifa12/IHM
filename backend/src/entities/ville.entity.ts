import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Region } from './region.entity';

@Entity({ name: 'villes' })
export class Ville {
  @PrimaryGeneratedColumn({ name: 'id_ville' })
  idVille!: number;

  @ManyToOne(() => Region, (r) => r.villes, { eager: true })
  @JoinColumn({ name: 'id_region' })
  region!: Region;

  @Column({ name: 'nom_ville', length: 100 })
  nomVille!: string;
}
