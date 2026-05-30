import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Prestataire } from './prestataire.entity';

@Entity({ name: 'disponibilites' })
export class Disponibilite {
  @PrimaryGeneratedColumn({ name: 'id_disponibilite' })
  idDisponibilite!: number;

  @ManyToOne(() => Prestataire, (p) => p.disponibilites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_prestataire' })
  prestataire!: Prestataire;

  @Column({ type: 'date' }) date!: string;
  @Column({ name: 'heure_debut', type: 'time' }) heureDebut!: string;
  @Column({ name: 'heure_fin', type: 'time' }) heureFin!: string;
}
