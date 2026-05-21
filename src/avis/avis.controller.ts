import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AvisService } from './avis.service';
import { CreateAvisDto, UpdateAvisDto } from '../dto';
import { Avis, AvisType } from '../entities/avis.entity';

/**
 * Contrôleur pour la gestion des avis (Commentaires et Notes)
 * Points de terminaison pour CRUD et opérations spécifiques sur les avis
 */
@Controller('avis')
export class AvisController {
  constructor(private readonly avisService: AvisService) {}

  /**
   * Crée un nouvel avis
   * POST /avis
   */
  @Post()
  create(@Body() createAvisDto: CreateAvisDto): Promise<Avis> {
    return this.avisService.create(createAvisDto);
  }

  /**
   * Récupère tous les avis
   * GET /avis
   */
  @Get()
  findAll(
    @Query('idReservation') idReservation?: string,
    @Query('typeAvis') typeAvis?: AvisType,
  ): Promise<Avis[]> {
    return this.avisService.findAll({
      idReservation,
      typeAvis,
    });
  }

  /**
   * Récupère les commentaires uniquement
   * GET /avis/commentaires
   */
  @Get('commentaires')
  findCommentaires(@Query('idReservation') idReservation?: string) {
    return this.avisService.findCommentaires(idReservation);
  }

  /**
   * Récupère les notes uniquement
   * GET /avis/notes
   */
  @Get('notes')
  findNotes(@Query('idReservation') idReservation?: string) {
    return this.avisService.findNotes(idReservation);
  }

  /**
   * Récupère les avis d'une réservation
   * GET /avis/reservation/:idReservation
   */
  @Get('reservation/:idReservation')
  findByReservation(@Param('idReservation') idReservation: string) {
    return this.avisService.findByReservation(idReservation);
  }

  /**
   * Récupère la note moyenne d'une réservation
   * GET /avis/reservation/:idReservation/moyenne
   */
  @Get('reservation/:idReservation/moyenne')
  getAverageNote(@Param('idReservation') idReservation: string) {
    return this.avisService.getAverageNote(idReservation);
  }

  /**
   * Récupère un avis par ID
   * GET /avis/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Avis> {
    return this.avisService.findOne(id);
  }

  /**
   * Modifie un avis
   * PATCH /avis/:id
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAvisDto: UpdateAvisDto,
  ): Promise<Avis> {
    return this.avisService.update(id, updateAvisDto);
  }

  /**
   * Supprime un avis
   * DELETE /avis/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.avisService.remove(id);
  }

  /**
   * Signale un avis comme abusif
   * POST /avis/:id/report
   */
  @Post(':id/report')
  reportAvis(@Param('id') id: string): Promise<Avis> {
    return this.avisService.reportAvis(id);
  }

  /**
   * Affiche/masque manuellement un avis
   * PATCH /avis/:id/visibility
   */
  @Patch(':id/visibility')
  toggleVisibility(@Param('id') id: string): Promise<Avis> {
    return this.avisService.toggleVisibility(id);
  }
}
