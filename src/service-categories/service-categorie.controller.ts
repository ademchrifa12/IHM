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
import { ServiceCategorieService } from './service-categorie.service';
import { CreateServiceCategorieDto, UpdateServiceCategorieDto } from '../dto';
import { ServiceCategorie } from '../entities/service-categorie.entity';

/**
 * Contrôleur pour la gestion des relations Service-Categorie
 * Gère la composition entre Categorie et Service (S.Categorie)
 * Points de terminaison pour CRUD et opérations spécifiques
 */
@Controller('service-categories')
export class ServiceCategorieController {
  constructor(
    private readonly serviceCategorieService: ServiceCategorieService,
  ) {}

  /**
   * Crée une nouvelle relation Service-Categorie
   * POST /service-categories
   */
  @Post()
  create(
    @Body() createServiceCategorieDto: CreateServiceCategorieDto,
  ): Promise<ServiceCategorie> {
    return this.serviceCategorieService.create(createServiceCategorieDto);
  }

  /**
   * Récupère toutes les relations Service-Categorie
   * GET /service-categories
   */
  @Get()
  findAll(
    @Query('idService') idService?: string,
    @Query('idCategorie') idCategorie?: string,
  ): Promise<ServiceCategorie[]> {
    return this.serviceCategorieService.findAll({
      idService,
      idCategorie,
    });
  }

  /**
   * Récupère les catégories d'un service
   * GET /service-categories/service/:idService
   */
  @Get('service/:idService')
  findByService(@Param('idService') idService: string) {
    return this.serviceCategorieService.findByService(idService);
  }

  /**
   * Récupère les services d'une catégorie
   * GET /service-categories/categorie/:idCategorie
   */
  @Get('categorie/:idCategorie')
  findByCategorie(@Param('idCategorie') idCategorie: string) {
    return this.serviceCategorieService.findByCategorie(idCategorie);
  }

  /**
   * Récupère le nombre de services par catégorie
   * GET /service-categories/categorie/:idCategorie/count
   */
  @Get('categorie/:idCategorie/count')
  countServicesByCategorie(@Param('idCategorie') idCategorie: string) {
    return this.serviceCategorieService.countServicesByCategorie(idCategorie);
  }

  /**
   * Récupère une relation Service-Categorie par ID
   * GET /service-categories/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ServiceCategorie> {
    return this.serviceCategorieService.findOne(id);
  }

  /**
   * Modifie une relation Service-Categorie
   * PATCH /service-categories/:id
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceCategorieDto: UpdateServiceCategorieDto,
  ): Promise<ServiceCategorie> {
    return this.serviceCategorieService.update(id, updateServiceCategorieDto);
  }

  /**
   * Supprime une relation Service-Categorie
   * DELETE /service-categories/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.serviceCategorieService.remove(id);
  }

  /**
   * Ajoute une catégorie à un service
   * POST /service-categories/:idService/add-categorie/:idCategorie
   */
  @Post(':idService/add-categorie/:idCategorie')
  addCategorieToService(
    @Param('idService') idService: string,
    @Param('idCategorie') idCategorie: string,
    @Body('nom') nom?: string,
  ) {
    return this.serviceCategorieService.addCategorieToService(
      idService,
      idCategorie,
      nom,
    );
  }

  /**
   * Retire une catégorie d'un service
   * DELETE /service-categories/:idService/remove-categorie/:idCategorie
   */
  @Delete(':idService/remove-categorie/:idCategorie')
  removeCategorieFromService(
    @Param('idService') idService: string,
    @Param('idCategorie') idCategorie: string,
  ) {
    return this.serviceCategorieService.removeCategorieFromService(
      idService,
      idCategorie,
    );
  }
}
