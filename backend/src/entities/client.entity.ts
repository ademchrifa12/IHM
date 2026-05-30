import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn({ name: 'id_client' })
  idClient!: number;

  @OneToOne(() => User, (u) => u.client, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user' })
  user!: User;
}
