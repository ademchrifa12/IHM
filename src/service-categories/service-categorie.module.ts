import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceCategorieController } from './service-categorie.controller';
import { ServiceCategorieService } from './service-categorie.service';
import { ServiceCategorie } from '../entities/service-categorie.entity';
import { Service } from '../entities/service.entity';
import { Categorie } from '../entities/categorie.entity';

/**
 * Module pour la gestion des relations Service-Categorie
 * Gère la composition (Categorie compose ServiceCategorie)
 * et l'agrégation (ServiceCategorie agrège Service)
 */
@Module({
  imports: [TypeOrmModule.forFeature([ServiceCategorie, Service, Categorie])],
  controllers: [ServiceCategorieController],
  providers: [ServiceCategorieService],
  exports: [ServiceCategorieService],
})
export class ServiceCategorieModule {}
