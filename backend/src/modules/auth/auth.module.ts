import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from '../../entities/user.entity';
import { Client } from '../../entities/client.entity';
import { Prestataire } from '../../entities/prestataire.entity';
import { RefreshToken } from '../../entities/refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Client, Prestataire, RefreshToken]),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
