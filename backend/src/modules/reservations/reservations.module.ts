import {
  BadRequestException, Body, Controller, ForbiddenException, Get, Module,
  NotFoundException, Param, Patch, Post, UseGuards,
} from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsDateString, IsInt } from 'class-validator';
import { Reservation } from '../../entities/reservation.entity';
import { Service } from '../../entities/service.entity';
import { Client } from '../../entities/client.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { StatutReservation, UserRole } from '../../common/enums';
import { CurrentUser, AuthUserPayload } from '../../common/decorators/current-user.decorator';

class CreateReservationDto {
  @IsInt() idService!: number;
  @IsDateString() dateReservation!: string;
}

@ApiTags('Réservations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(
    @InjectRepository(Reservation) private readonly reservations: Repository<Reservation>,
    @InjectRepository(Service) private readonly services: Repository<Service>,
    @InjectRepository(Client) private readonly clients: Repository<Client>,
  ) {}

  @Roles(UserRole.CLIENT)
  @Get('mes')
  async mesReservations(@CurrentUser() u: AuthUserPayload) {
    const c = await this.clients.findOne({ where: { user: { idUser: u.sub } } });
    if (!c) throw new NotFoundException('Profil client introuvable.');
    return this.reservations.find({
      where: { client: { idClient: c.idClient } },
      order: { dateReservation: 'DESC' },
    });
  }

  @Roles(UserRole.PRESTATAIRE)
  @Get('prestataire/mes')
  async mesReservationsPrestataire(@CurrentUser() u: AuthUserPayload) {
    return this.reservations.find({
      where: { prestataire: { user: { idUser: u.sub } } },
      order: { dateReservation: 'DESC' },
    });
  }

  @Roles(UserRole.CLIENT)
  @Post()
  async create(@CurrentUser() u: AuthUserPayload, @Body() dto: CreateReservationDto) {
    const client = await this.clients.findOne({ where: { user: { idUser: u.sub } } });
    if (!client) throw new NotFoundException('Profil client introuvable.');
    const service = await this.services.findOne({
      where: { idService: dto.idService },
      relations: ['prestataire'],
    });
    if (!service) throw new NotFoundException('Service introuvable.');
    return this.reservations.save(
      this.reservations.create({
        client,
        prestataire: service.prestataire,
        service,
        dateReservation: new Date(dto.dateReservation),
        statut: StatutReservation.EN_ATTENTE,
      }),
    );
  }

  @Roles(UserRole.PRESTATAIRE)
  @Patch(':id/statut')
  async changerStatut(
    @CurrentUser() u: AuthUserPayload,
    @Param('id') id: number,
    @Body('statut') statut: StatutReservation,
  ) {
    if (!Object.values(StatutReservation).includes(statut)) {
      throw new BadRequestException('Statut de réservation invalide.');
    }
    const r = await this.reservations.findOne({
      where: { idReservation: Number(id) },
      relations: ['prestataire', 'prestataire.user'],
    });
    if (!r) throw new NotFoundException('Réservation introuvable.');
    if (r.prestataire.user.idUser !== u.sub) throw new ForbiddenException('Accès refusé.');
    r.statut = statut;
    return this.reservations.save(r);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Service, Client])],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
