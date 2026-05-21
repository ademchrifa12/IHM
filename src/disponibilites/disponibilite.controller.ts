import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DisponibiliteService } from './disponibilite.service';
import { CreateDisponibiliteDto, UpdateDisponibiliteDto } from '../dto';
import { Disponibilite } from '../entities/disponibilite.entity';

/**
 * Contrôleur pour la gestion des disponibilités des prestataires
 * Points de terminaison pour CRUD et opérations spécifiques
 */
@Controller('disponibilites')
export class DisponibiliteController {
  constructor(private readonly disponibiliteService: DisponibiliteService) {}

  /**
   * Crée une nouvelle disponibilité
   * POST /disponibilites
   */
  @Post()
  create(
    @Body() createDisponibiliteDto: CreateDisponibiliteDto,
  ): Promise<Disponibilite> {
    return this.disponibiliteService.create(createDisponibiliteDto);
  }

  /**
   * Récupère toutes les disponibilités
   * GET /disponibilites
   */
  @Get()
  findAll(
    @Query('idPrestataire') idPrestataire?: string,
  ): Promise<Disponibilite[]> {
    return this.disponibiliteService.findAll({ idPrestataire });
  }

  /**
   * Récupère les disponibilités d'un prestataire
   * GET /disponibilites/prestataire/:idPrestataire
   */
  @Get('prestataire/:idPrestataire')
  findByPrestataire(@Param('idPrestataire') idPrestataire: string) {
    return this.disponibiliteService.findByPrestataire(idPrestataire);
  }

  /**
   * Récupère les disponibilités actives pour un jour spécifique
   * GET /disponibilites/prestataire/:idPrestataire/day/:day
   */
  @Get('prestataire/:idPrestataire/day/:day')
  findActiveForDay(
    @Param('idPrestataire') idPrestataire: string,
    @Param('day') day: string,
  ) {
    return this.disponibiliteService.findActiveForDay(
      idPrestataire,
      parseInt(day),
    );
  }

  /**
   * Récupère une disponibilité par ID
   * GET /disponibilites/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Disponibilite> {
    return this.disponibiliteService.findOne(id);
  }

  /**
   * Modifie une disponibilité
   * PATCH /disponibilites/:id
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDisponibiliteDto: UpdateDisponibiliteDto,
  ): Promise<Disponibilite> {
    return this.disponibiliteService.update(id, updateDisponibiliteDto);
  }

  /**
   * Supprime une disponibilité
   * DELETE /disponibilites/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.disponibiliteService.remove(id);
  }

  /**
   * Vérifie la disponibilité à une date/heure précise
   * POST /disponibilites/check-availability
   */
  @Post('check-availability')
  checkAvailability(
    @Body()
    body: {
      idPrestataire: string;
      date: string;
      heureDebut: string;
      heureFin: string;
    },
  ) {
    return this.disponibiliteService.isAvailable(
      body.idPrestataire,
      new Date(body.date),
      body.heureDebut,
      body.heureFin,
    );
  }
}
