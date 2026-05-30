import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'admins' })
export class Admin {
  @PrimaryGeneratedColumn({ name: 'id_admin' })
  idAdmin!: number;

  @OneToOne(() => User, (u) => u.admin, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user' })
  user!: User;
}
