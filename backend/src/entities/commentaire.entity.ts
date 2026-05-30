import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './client.entity';
import { Prestataire } from './prestataire.entity';

@Entity({ name: 'commentaires' })
export class Commentaire {
  @PrimaryGeneratedColumn({ name: 'id_commentaire' })
  idCommentaire!: number;

  @ManyToOne(() => Client, { eager: true })
  @JoinColumn({ name: 'id_client' })
  client!: Client;

  @ManyToOne(() => Prestataire, { eager: true })
  @JoinColumn({ name: 'id_prestataire' })
  prestataire!: Prestataire;

  @Column({ type: 'int' }) note!: number;
  @Column({ type: 'nvarchar', length: 1000, nullable: true }) commentaire?: string;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation!: Date;

  @Column({ type: 'bit', default: true })
  modere!: boolean;
}
