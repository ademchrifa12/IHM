import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avis, AvisType } from '../entities/avis.entity';
import { Commentaire } from '../entities/commentaire.entity';
import { Note } from '../entities/note.entity';
import { Reservation } from '../entities/reservation.entity';
import { ReservationStatus } from '../entities/reservation.entity';
import { CreateAvisDto, UpdateAvisDto } from '../dto';

/**
 * Service pour la gestion des avis (Commentaires et Notes)
 * Gère l'héritage STI (Single Table Inheritance) avec Avis parent
 */
@Injectable()
export class AvisService {
  constructor(
    @InjectRepository(Avis)
    private avisRepository: Repository<Avis>,
    @InjectRepository(Commentaire)
    private commentaireRepository: Repository<Commentaire>,
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  /**
   * Crée un nouvel avis (Commentaire ou Note)
   */
  async create(createAvisDto: CreateAvisDto): Promise<Avis> {
    // Vérifier que la réservation existe et est complétée
    const reservation = await this.reservationRepository.findOne({
      where: { idReservation: createAvisDto.idReservation },
    });

    if (!reservation) {
      throw new NotFoundException('Réservation non trouvée');
    }

    if (reservation.statut !== ReservationStatus.COMPLETED) {
      throw new BadRequestException(
        'Les avis ne peuvent être ajoutés que pour les réservations complétées',
      );
    }

    let avis: Avis;

    if (createAvisDto.typeAvis === AvisType.COMMENTAIRE) {
      if (!createAvisDto.contenu) {
        throw new BadRequestException(
          'Un commentaire doit contenir du texte',
        );
      }
      avis = this.commentaireRepository.create({
        ...createAvisDto,
        reservation,
      });
      avis = await this.commentaireRepository.save(avis);
    } else if (createAvisDto.typeAvis === AvisType.NOTE) {
      avis = this.noteRepository.create({
        note: createAvisDto.note,
        idReservation: createAvisDto.idReservation,
        reservation,
        typeAvis: AvisType.NOTE,
      });
      avis = await this.noteRepository.save(avis);
    } else {
      throw new BadRequestException('Type d\'avis invalide');
    }

    return avis;
  }

  /**
   * Récupère tous les avis
   */
  async findAll(filters?: {
    idReservation?: string;
    typeAvis?: AvisType;
  }): Promise<Avis[]> {
    const query = this.avisRepository.createQueryBuilder('avis');

    if (filters?.idReservation) {
      query.where('avis.idReservation = :idReservation', {
        idReservation: filters.idReservation,
      });
    }

    if (filters?.typeAvis) {
      query.andWhere('avis.typeAvis = :typeAvis', {
        typeAvis: filters.typeAvis,
      });
    }

    return query.orderBy('avis.dateCreation', 'DESC').getMany();
  }

  /**
   * Récupère les commentaires uniquement
   */
  async findCommentaires(idReservation?: string): Promise<Commentaire[]> {
    return this.findAll({
      idReservation,
      typeAvis: AvisType.COMMENTAIRE,
    }) as Promise<Commentaire[]>;
  }

  /**
   * Récupère les notes uniquement
   */
  async findNotes(idReservation?: string): Promise<Note[]> {
    return this.findAll({
      idReservation,
      typeAvis: AvisType.NOTE,
    }) as Promise<Note[]>;
  }

  /**
   * Récupère un avis par ID
   */
  async findOne(idAvis: string): Promise<Avis> {
    const avis = await this.avisRepository.findOne({
      where: { idAvis },
      relations: ['reservation'],
    });

    if (!avis) {
      throw new NotFoundException(`Avis ${idAvis} non trouvé`);
    }

    return avis;
  }

  /**
   * Modifie un avis
   */
  async update(idAvis: string, updateAvisDto: UpdateAvisDto): Promise<Avis> {
    const avis = await this.findOne(idAvis);

    if (updateAvisDto.note !== undefined) {
      avis.note = updateAvisDto.note;
    }

    if (updateAvisDto.contenu !== undefined && avis.typeAvis === AvisType.COMMENTAIRE) {
      avis.contenu = updateAvisDto.contenu;
    }

    return this.avisRepository.save(avis);
  }

  /**
   * Supprime un avis
   */
  async remove(idAvis: string): Promise<void> {
    const avis = await this.findOne(idAvis);
    await this.avisRepository.remove(avis);
  }

  /**
   * Récupère les avis d'une réservation
   */
  async findByReservation(idReservation: string): Promise<Avis[]> {
    return this.avisRepository.find({
      where: { idReservation },
      order: { dateCreation: 'DESC' },
    });
  }

  /**
   * Récupère la note moyenne pour une réservation
   */
  async getAverageNote(idReservation: string): Promise<number> {
    const result = await this.avisRepository
      .createQueryBuilder('avis')
      .select('AVG(avis.note)', 'average')
      .where('avis.idReservation = :idReservation', { idReservation })
      .andWhere('avis.note IS NOT NULL')
      .getRawOne();

    return result?.average ? parseFloat(result.average) : 0;
  }

  /**
   * Signale un avis comme abusif
   */
  async reportAvis(idAvis: string): Promise<Avis> {
    const avis = await this.findOne(idAvis);
    avis.nombreSignalement += 1;

    // Si trop de signalements, masquer l'avis
    if (avis.nombreSignalement >= 3) {
      avis.estVisible = false;
    }

    return this.avisRepository.save(avis);
  }

  /**
   * Affiche/masque manuellement un avis
   */
  async toggleVisibility(idAvis: string): Promise<Avis> {
    const avis = await this.findOne(idAvis);
    avis.estVisible = !avis.estVisible;
    return this.avisRepository.save(avis);
  }
}
