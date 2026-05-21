import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentairesService } from './commentaires.service';
import { CommentairesController } from './commentaires.controller';
import { Commentaire } from '../entities/commentaire.entity';
import { AuthModule } from '../auth/auth.module';
import { Avis } from '../entities/avis.entity';
import { Reservation } from '../entities/reservation.entity';

/**
 * Module pour la gestion des commentaires (héritage de Avis)
 * Couche de compatibilité pour accéder aux commentaires via la structure Avis
 * @deprecated Utiliser le module Avis directement pour les nouvelles fonctionnalités
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Commentaire, Avis, Reservation]),
    AuthModule,
  ],
  providers: [CommentairesService],
  controllers: [CommentairesController],
  exports: [CommentairesService],
})
export class CommentairesModule {}
