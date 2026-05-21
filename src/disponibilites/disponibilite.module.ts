import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisponibiliteController } from './disponibilite.controller';
import { DisponibiliteService } from './disponibilite.service';
import { Disponibilite } from '../entities/disponibilite.entity';
import { Prestataire } from '../entities/prestataire.entity';

/**
 * Module pour la gestion des disponibilités des prestataires
 */
@Module({
  imports: [TypeOrmModule.forFeature([Disponibilite, Prestataire])],
  controllers: [DisponibiliteController],
  providers: [DisponibiliteService],
  exports: [DisponibiliteService],
})
export class DisponibiliteModule {}
