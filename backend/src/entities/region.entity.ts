import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ville } from './ville.entity';

@Entity({ name: 'regions' })
export class Region {
  @PrimaryGeneratedColumn({ name: 'id_region' })
  idRegion!: number;

  @Column({ name: 'nom_region', length: 100, unique: true })
  nomRegion!: string;

  @OneToMany(() => Ville, (v) => v.region)
  villes?: Ville[];
}
