import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvisController } from './avis.controller';
import { AvisService } from './avis.service';
import { Avis } from '../entities/avis.entity';
import { Commentaire } from '../entities/commentaire.entity';
import { Note } from '../entities/note.entity';
import { Reservation } from '../entities/reservation.entity';

/**
 * Module pour la gestion des avis (Commentaires et Notes)
 * Gère l'héritage STI avec la classe parent Avis
 */
@Module({
  imports: [TypeOrmModule.forFeature([Avis, Commentaire, Note, Reservation])],
  controllers: [AvisController],
  providers: [AvisService],
  exports: [AvisService],
})
export class AvisModule {}
