import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
  @PrimaryGeneratedColumn() id!: number;

  @ManyToOne(() => User, (u) => u.refreshTokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user' })
  user!: User;

  @Column({ name: 'token_hash', length: 255 }) tokenHash!: string;
  @Column({ name: 'expires_at', type: 'datetime2' }) expiresAt!: Date;
  @Column({ default: false }) revoked!: boolean;
  @CreateDateColumn({ name: 'created_at' }) createdAt!: Date;
}
