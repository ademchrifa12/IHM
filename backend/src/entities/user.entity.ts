import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../common/enums';
import { Client } from './client.entity';
import { Prestataire } from './prestataire.entity';
import { Admin } from './admin.entity';
import { RefreshToken } from './refresh-token.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id_user' })
  idUser!: number;

  @Column({ length: 100 }) nom!: string;
  @Column({ length: 100 }) prenom!: string;
  @Column({ length: 190, unique: true }) email!: string;
  @Column({ name: 'mot_de_passe', length: 255 }) motDePasse!: string;

  @Column({ type: 'varchar', length: 20 })
  role!: UserRole;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation!: Date;

  @OneToOne(() => Client, (c) => c.user) client?: Client;
  @OneToOne(() => Prestataire, (p) => p.user) prestataire?: Prestataire;
  @OneToOne(() => Admin, (a) => a.user) admin?: Admin;
  @OneToMany(() => RefreshToken, (r) => r.user) refreshTokens?: RefreshToken[];
}
