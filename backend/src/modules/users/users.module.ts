import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';
import { Admin } from '../../entities/admin.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';
import { CurrentUser, AuthUserPayload } from '../../common/decorators/current-user.decorator';

@ApiTags('Utilisateurs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

  @Get('me')
  async me(@CurrentUser() u: AuthUserPayload) {
    return this.users.findOne({
      where: { idUser: u.sub },
      relations: ['client', 'prestataire', 'admin'],
    });
  }

  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.users.find();
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([User, Admin])],
  controllers: [UsersController],
})
export class UsersModule {}
