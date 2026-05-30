import {
  Body, Controller, Delete, Get, Module, NotFoundException,
  Param, Post, Query, UseGuards,
} from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Disponibilite } from '../../entities/disponibilite.entity';
import { Prestataire } from '../../entities/prestataire.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';
import { CurrentUser, AuthUserPayload } from '../../common/decorators/current-user.decorator';

class CreateDisponibiliteDto {
  @IsNotEmpty() date!: string;
  @IsNotEmpty() heureDebut!: string;
  @IsNotEmpty() heureFin!: string;
}

@ApiTags('Disponibilités')
@Controller('disponibilites')
export class DisponibilitesController {
  constructor(
    @InjectRepository(Disponibilite) private readonly repo: Repository<Disponibilite>,
    @InjectRepository(Prestataire) private readonly prestataires: Repository<Prestataire>,
  ) {}

  @Get()
  findAll(@Query('idPrestataire') idPrestataire: number) {
    return this.repo.find({
      where: { prestataire: { idPrestataire: Number(idPrestataire) } },
      order: { date: 'ASC' },
    });
  }

  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles(UserRole.PRESTATAIRE)
  @Post()
  async create(@CurrentUser() u: AuthUserPayload, @Body() dto: CreateDisponibiliteDto) {
    const p = await this.prestataires.findOne({ where: { user: { idUser: u.sub } } });
    if (!p) throw new NotFoundException('Profil prestataire introuvable.');
    return this.repo.save(this.repo.create({ ...dto, prestataire: p }));
  }

  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles(UserRole.PRESTATAIRE)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.repo.delete(Number(id));
    return { message: 'Disponibilité supprimée.' };
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Disponibilite, Prestataire])],
  controllers: [DisponibilitesController],
})
export class DisponibilitesModule {}
