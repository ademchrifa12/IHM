import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export enum UserType {
  CLIENT = 'client',
  PRESTATAIRE = 'prestataire',
  ADMIN = 'admin',
}

@Entity('users')
@Index(['email'], { unique: true })
@Index(['typeUtilisateur'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  idUtilisateur: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  motDePasse: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  typeUtilisateur: UserType;

  @Column({ nullable: true })
  telephone?: string;

  @Column({ nullable: true })
  adresse?: string;

  @Column({ nullable: true })
  codePostal?: string;

  @Column({ nullable: true })
  ville?: string;

  @Column({ default: false })
  emailVerifie: boolean;

  @Column({ default: true })
  estActif: boolean;

  @Column({ nullable: true })
  photoUrl?: string;

  @Column({ nullable: true, type: 'text' })
  biographie?: string;

  @CreateDateColumn()
  dateCreation: Date;

  @UpdateDateColumn()
  dateModification: Date;

  @Column({ nullable: true })
  derniereConnexion?: Date;

  // Relations
  @OneToMany(() => require('./client.entity').Client, (client: any) => client.user)
  clientProfile?: any;

  @OneToMany(
    () => require('./prestataire.entity').Prestataire,
    (prestataire: any) => prestataire.user,
  )
  prestaireProfile?: any;

  @OneToMany(() => require('./admin.entity').Admin, (admin: any) => admin.user)
  adminProfile?: any;

  // Helper methods
  sInscrire(): boolean {
    return true;
  }

  sAuthentifier(): boolean {
    return true;
  }
}
