import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Module,
  NotFoundException,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Prestataire } from '../../entities/prestataire.entity';
import { Commentaire } from '../../entities/commentaire.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { StatutValidation, UserRole } from '../../common/enums';
import { CurrentUser, AuthUserPayload } from '../../common/decorators/current-user.decorator';
import { SearchPrestatairesDto, UpdatePrestataireDto } from './dto/prestataire.dto';
import { haversineKm } from '../../common/utils/geo';

@ApiTags('Prestataires')
@Controller('prestataires')
export class PrestatairesController {
  constructor(
    @InjectRepository(Prestataire) private readonly repo: Repository<Prestataire>,
    @InjectRepository(Commentaire) private readonly comments: Repository<Commentaire>,
  ) {}

  /** Recherche publique (simple + avancée + géo). */
  @Get()
  async search(@Query() q: SearchPrestatairesDto) {
    const qb = this.repo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.user', 'u')
      .leftJoinAndSelect('p.services', 's')
      .leftJoinAndSelect('s.categorie', 'c')
      .leftJoinAndSelect('s.sousCategorie', 'sc')
      .where('p.statutValidation = :v', { v: StatutValidation.VALIDE });

    if (q.idCategorie) qb.andWhere('c.idCategorie = :ic', { ic: q.idCategorie });
    if (q.idSousCategorie) qb.andWhere('sc.idSousCategorie = :isc', { isc: q.idSousCategorie });
    if (q.q) qb.andWhere('(u.nom LIKE :kw OR u.prenom LIKE :kw OR s.titre LIKE :kw)', { kw: `%${q.q}%` });

    let items = await qb.getMany();

    // Note moyenne
    const notes = await this.comments
      .createQueryBuilder('c')
      .select('c.id_prestataire', 'idPrestataire')
      .addSelect('AVG(CAST(c.note AS FLOAT))', 'moyenne')
      .where('c.modere = 1')
      .groupBy('c.id_prestataire')
      .getRawMany();
    const noteMap = new Map(notes.map((n) => [Number(n.idPrestataire), Number(n.moyenne)]));

    items = items.map((p) => ({
      ...p,
      noteMoyenne: noteMap.get(p.idPrestataire) ?? 0,
    })) as any;

    if (q.noteMin) items = items.filter((p: any) => p.noteMoyenne >= q.noteMin!);

    if (q.latitude && q.longitude) {
      items = items
        .map((p: any) => ({
          ...p,
          distanceKm:
            p.latitude && p.longitude
              ? haversineKm(q.latitude!, q.longitude!, p.latitude, p.longitude)
              : null,
        }))
        .filter((p: any) =>
          q.distanceKm ? p.distanceKm !== null && p.distanceKm <= q.distanceKm : true,
        )
        .sort((a: any, b: any) => (a.distanceKm ?? 1e9) - (b.distanceKm ?? 1e9));
    }

    const page = q.page ?? 1;
    const limit = q.limit ?? 10;
    const total = items.length;
    const start = (page - 1) * limit;
    return {
      items: items.slice(start, start + limit),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const p = await this.repo.findOne({
      where: { idPrestataire: Number(id) },
      relations: ['user', 'services', 'services.categorie', 'services.sousCategorie', 'disponibilites'],
    });
    if (!p) throw new NotFoundException('Prestataire introuvable.');
    const rows = await this.comments.find({
      where: { prestataire: { idPrestataire: p.idPrestataire }, modere: true },
    });
    const noteMoyenne =
      rows.length === 0 ? 0 : rows.reduce((s, c) => s + c.note, 0) / rows.length;
    return { ...p, noteMoyenne, nbAvis: rows.length };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PRESTATAIRE)
  @Patch('me')
  async updateMyProfile(@CurrentUser() u: AuthUserPayload, @Body() dto: UpdatePrestataireDto) {
    const p = await this.repo.findOne({ where: { user: { idUser: u.sub } }, relations: ['user'] });
    if (!p) throw new NotFoundException('Profil prestataire introuvable.');
    Object.assign(p, dto);
    return this.repo.save(p);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/validation')
  async setValidation(@Param('id') id: number, @Body('statut') statut: StatutValidation) {
    if (!Object.values(StatutValidation).includes(statut)) {
      throw new BadRequestException('Statut de validation invalide.');
    }
    const p = await this.repo.findOne({ where: { idPrestataire: Number(id) } });
    if (!p) throw new NotFoundException('Prestataire introuvable.');
    p.statutValidation = statut;
    return this.repo.save(p);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Prestataire, Commentaire])],
  controllers: [PrestatairesController],
})
export class PrestatairesModule {}
