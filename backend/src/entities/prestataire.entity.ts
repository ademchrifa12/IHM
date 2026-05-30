import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { StatutValidation } from '../common/enums';
import { Service } from './service.entity';
import { Disponibilite } from './disponibilite.entity';

@Entity({ name: 'prestataires' })
export class Prestataire {
  @PrimaryGeneratedColumn({ name: 'id_prestataire' })
  idPrestataire!: number;

  @OneToOne(() => User, (u) => u.prestataire, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user' })
  user!: User;

  @Column({ type: 'nvarchar', length: 2000, nullable: true }) description?: string;
  @Column({ length: 500, nullable: true }) photo?: string;
  @Column({ length: 30, nullable: true }) telephone?: string;
  @Column({ length: 255, nullable: true }) adresse?: string;
  @Column({ type: 'float', nullable: true }) latitude?: number;
  @Column({ type: 'float', nullable: true }) longitude?: number;

  @Column({ name: 'statut_validation', type: 'varchar', length: 20, default: 'EN_ATTENTE' })
  statutValidation!: StatutValidation;

  @OneToMany(() => Service, (s) => s.prestataire) services?: Service[];
  @OneToMany(() => Disponibilite, (d) => d.prestataire) disponibilites?: Disponibilite[];
}
