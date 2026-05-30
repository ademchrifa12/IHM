import {
  Body, Controller, Delete, ForbiddenException, Get, Module, NotFoundException,
  Param, Patch, Post, UseGuards,
} from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Service } from '../../entities/service.entity';
import { Prestataire } from '../../entities/prestataire.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';
import { CurrentUser, AuthUserPayload } from '../../common/decorators/current-user.decorator';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(
    @InjectRepository(Service) private readonly services: Repository<Service>,
    @InjectRepository(Prestataire) private readonly prestataires: Repository<Prestataire>,
  ) {}

  @Get()
  findAll() {
    return this.services.find({ relations: ['prestataire', 'prestataire.user'] });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const s = await this.services.findOne({
      where: { idService: Number(id) },
      relations: ['prestataire', 'prestataire.user'],
    });
    if (!s) throw new NotFoundException('Service introuvable.');
    return s;
  }

  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles(UserRole.PRESTATAIRE)
  @Post()
  async create(@CurrentUser() u: AuthUserPayload, @Body() dto: CreateServiceDto) {
    const p = await this.prestataires.findOne({ where: { user: { idUser: u.sub } } });
    if (!p) throw new NotFoundException('Profil prestataire introuvable.');
    return this.services.save(
      this.services.create({
        prestataire: p,
        categorie: { idCategorie: dto.idCategorie } as any,
        sousCategorie: dto.idSousCategorie ? ({ idSousCategorie: dto.idSousCategorie } as any) : undefined,
        titre: dto.titre,
        description: dto.description,
        prix: dto.prix,
      }),
    );
  }

  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles(UserRole.PRESTATAIRE)
  @Patch(':id')
  async update(@CurrentUser() u: AuthUserPayload, @Param('id') id: number, @Body() dto: UpdateServiceDto) {
    const s = await this.services.findOne({
      where: { idService: Number(id) },
      relations: ['prestataire', 'prestataire.user'],
    });
    if (!s) throw new NotFoundException('Service introuvable.');
    if (s.prestataire.user.idUser !== u.sub) throw new ForbiddenException('Accès refusé.');
    Object.assign(s, dto);
    if (dto.idCategorie) (s as any).categorie = { idCategorie: dto.idCategorie };
    if (dto.idSousCategorie) (s as any).sousCategorie = { idSousCategorie: dto.idSousCategorie };
    return this.services.save(s);
  }

  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles(UserRole.PRESTATAIRE, UserRole.ADMIN)
  @Delete(':id')
  async remove(@CurrentUser() u: AuthUserPayload, @Param('id') id: number) {
    const s = await this.services.findOne({
      where: { idService: Number(id) },
      relations: ['prestataire', 'prestataire.user'],
    });
    if (!s) throw new NotFoundException('Service introuvable.');
    if (u.role === UserRole.PRESTATAIRE && s.prestataire.user.idUser !== u.sub) {
      throw new ForbiddenException('Accès refusé.');
    }
    await this.services.delete(Number(id));
    return { message: 'Service supprimé.' };
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Service, Prestataire])],
  controllers: [ServicesController],
})
export class ServicesModule {}
