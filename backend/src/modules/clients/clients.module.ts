import { Controller, Get, Module, UseGuards } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Client } from '../../entities/client.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@ApiTags('Clients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('clients')
export class ClientsController {
  constructor(@InjectRepository(Client) private readonly clients: Repository<Client>) {}

  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.clients.find({ relations: ['user'] });
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
})
export class ClientsModule {}
