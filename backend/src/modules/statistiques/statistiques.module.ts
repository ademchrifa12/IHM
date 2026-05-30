import { Controller, Get, Module, UseGuards } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';
import { Prestataire } from '../../entities/prestataire.entity';
import { Reservation } from '../../entities/reservation.entity';
import { Commentaire } from '../../entities/commentaire.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { StatutValidation, UserRole } from '../../common/enums';

@ApiTags('Statistiques')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('statistiques')
export class StatistiquesController {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Prestataire) private readonly prestataires: Repository<Prestataire>,
    @InjectRepository(Reservation) private readonly reservations: Repository<Reservation>,
    @InjectRepository(Commentaire) private readonly commentaires: Repository<Commentaire>,
  ) {}

  @Get()
  async global() {
    const [totalUsers, totalPrestataires, prestatairesValides, totalReservations, totalCommentaires] =
      await Promise.all([
        this.users.count(),
        this.prestataires.count(),
        this.prestataires.count({ where: { statutValidation: StatutValidation.VALIDE } }),
        this.reservations.count(),
        this.commentaires.count(),
      ]);

    const moyenneRaw = await this.commentaires
      .createQueryBuilder('c')
      .select('AVG(CAST(c.note AS FLOAT))', 'moyenne')
      .getRawOne();

    return {
      totalUsers,
      totalPrestataires,
      prestatairesValides,
      totalReservations,
      totalCommentaires,
      noteMoyenneGlobale: Number(moyenneRaw?.moyenne ?? 0),
    };
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([User, Prestataire, Reservation, Commentaire])],
  controllers: [StatistiquesController],
})
export class StatistiquesModule {}
