import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commentaire } from '../entities/commentaire.entity';
import { Avis, AvisType } from '../entities/avis.entity';
import { Reservation, ReservationStatus } from '../entities/reservation.entity';
import { CreateCommentaireDto, UpdateCommentaireDto } from '../dto';

/**
 * Service pour la gestion des commentaires (héritage de Avis)
 * Couche de compatibilité pour accéder aux commentaires via la structure Avis
 * 
 * MIGRATION: Les commentaires sont maintenant liés à Reservation via Avis
 * et non plus directement à Client et Service
 * 
 * @deprecated Utiliser le service Avis directement pour les nouvelles fonctionnalités
 */
@Injectable()
export class CommentairesService {
  constructor(
    @InjectRepository(Commentaire)
    private commentaireRepository: Repository<Commentaire>,
    @InjectRepository(Avis)
    private avisRepository: Repository<Avis>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  /**
   * Crée un nouveau commentaire (via Reservation -> Avis)
   * @deprecated Utiliser AvisService.create() avec typeAvis=COMMENTAIRE
   */
  async create(createCommentaireDto: CreateCommentaireDto): Promise<Commentaire> {
    if (
      !createCommentaireDto.note ||
      !createCommentaireDto.contenu ||
      createCommentaireDto.note < 1 ||
      createCommentaireDto.note > 5
    ) {
      throw new BadRequestException(
        'Données de commentaire invalides. La note doit être entre 1 et 5',
      );
    }

    // Chercher une réservation complétée entre ce client et ce service
    const reservation = await this.reservationRepository.findOne({
      where: {
        idClient: (createCommentaireDto as any).idClient,
        idService: (createCommentaireDto as any).idService,
        statut: ReservationStatus.COMPLETED,
      },
    });

    if (!reservation) {
      throw new BadRequestException(
        'Aucune réservation complétée trouvée entre ce client et ce service',
      );
    }

    // Créer un commentaire via Avis
    const commentaire = this.commentaireRepository.create({
      note: createCommentaireDto.note,
      contenu: createCommentaireDto.contenu,
      idReservation: reservation.idReservation,
      typeAvis: AvisType.COMMENTAIRE,
      estVisible: true,
      nombreSignalement: 0,
    });

    return this.commentaireRepository.save(commentaire);
  }

  /**
   * Récupère tous les commentaires visibles
   * @deprecated Utiliser AvisService.findCommentaires()
   */
  async findAll(
    limit: number = 10,
    offset: number = 0,
  ): Promise<{ data: Commentaire[]; total: number }> {
    const [data, total] = await this.avisRepository
      .createQueryBuilder('avis')
      .where('avis.typeAvis = :typeAvis', { typeAvis: AvisType.COMMENTAIRE })
      .andWhere('avis.estVisible = :estVisible', { estVisible: true })
      .leftJoinAndSelect('avis.reservation', 'reservation')
      .leftJoinAndSelect('reservation.client', 'client')
      .leftJoinAndSelect('reservation.service', 'service')
      .take(limit)
      .skip(offset)
      .orderBy('avis.dateCreation', 'DESC')
      .getManyAndCount();

    return { data: data as Commentaire[], total };
  }

  /**
   * Récupère un commentaire par ID
   * @deprecated Utiliser AvisService.findOne()
   */
  async findById(id: string): Promise<Commentaire> {
    const commentaire = await this.avisRepository.findOne({
      where: { idAvis: id, typeAvis: AvisType.COMMENTAIRE },
      relations: ['reservation', 'reservation.client', 'reservation.service'],
    });

    if (!commentaire) {
      throw new NotFoundException('Commentaire non trouvé');
    }

    return commentaire as Commentaire;
  }

  /**
   * Récupère les commentaires d'un service
   * @deprecated Utiliser AvisService avec les relations appropriées
   */
  async findByService(idService: string): Promise<Commentaire[]> {
    return this.avisRepository
      .createQueryBuilder('avis')
      .where('avis.typeAvis = :typeAvis', { typeAvis: AvisType.COMMENTAIRE })
      .andWhere('avis.estVisible = :estVisible', { estVisible: true })
      .leftJoinAndSelect('avis.reservation', 'reservation')
      .leftJoinAndSelect('reservation.service', 'service')
      .andWhere('reservation.idService = :idService', { idService })
      .orderBy('avis.dateCreation', 'DESC')
      .getMany() as Promise<Commentaire[]>;
  }

  /**
   * Récupère les commentaires d'un client
   * @deprecated Utiliser AvisService avec les relations appropriées
   */
  async findByClient(idClient: string): Promise<Commentaire[]> {
    return this.avisRepository
      .createQueryBuilder('avis')
      .where('avis.typeAvis = :typeAvis', { typeAvis: AvisType.COMMENTAIRE })
      .leftJoinAndSelect('avis.reservation', 'reservation')
      .leftJoinAndSelect('reservation.service', 'service')
      .andWhere('reservation.idClient = :idClient', { idClient })
      .orderBy('avis.dateCreation', 'DESC')
      .getMany() as Promise<Commentaire[]>;
  }

  /**
   * Modifie un commentaire
   * @deprecated Utiliser AvisService.update()
   */
  async update(
    id: string,
    updateCommentaireDto: UpdateCommentaireDto,
  ): Promise<Commentaire> {
    const commentaire = await this.findById(id);

    if (updateCommentaireDto.note) {
      if (updateCommentaireDto.note < 1 || updateCommentaireDto.note > 5) {
        throw new BadRequestException('La note doit être entre 1 et 5');
      }
      commentaire.note = updateCommentaireDto.note;
    }

    if (updateCommentaireDto.contenu) {
      commentaire.contenu = updateCommentaireDto.contenu;
    }

    return this.avisRepository.save(commentaire);
  }

  /**
   * Supprime un commentaire
   * @deprecated Utiliser AvisService.remove()
   */
  async delete(id: string): Promise<void> {
    const commentaire = await this.findById(id);
    await this.avisRepository.remove(commentaire);
  }

  /**
   * Affiche/masque un commentaire
   * @deprecated Utiliser AvisService.toggleVisibility()
   */
  async toggleVisibility(id: string, visible: boolean): Promise<Commentaire> {
    const commentaire = await this.findById(id);
    commentaire.estVisible = visible;
    return this.avisRepository.save(commentaire);
  }

  /**
   * Signale un commentaire comme abusif
   * @deprecated Utiliser AvisService.reportAvis()
   */
  async reportComment(id: string): Promise<Commentaire> {
    const commentaire = await this.findById(id);
    commentaire.nombreSignalement += 1;

    if (commentaire.nombreSignalement >= 3) {
      commentaire.estVisible = false;
    }

    return this.avisRepository.save(commentaire);
  }

  /**
   * Récupère les statistiques de notation d'un service
   * @deprecated Utiliser AvisService.getAverageNote()
   */
  async getServiceRating(idService: string): Promise<{
    averageRating: number;
    totalComments: number;
  }> {
    const result = await this.avisRepository
      .createQueryBuilder('avis')
      .where('avis.typeAvis = :typeAvis', { typeAvis: AvisType.COMMENTAIRE })
      .andWhere('avis.estVisible = :estVisible', { estVisible: true })
      .leftJoinAndSelect('avis.reservation', 'reservation')
      .andWhere('reservation.idService = :idService', { idService })
      .select('AVG(avis.note)', 'averageRating')
      .addSelect('COUNT(*)', 'totalComments')
      .getRawOne();

    return {
      averageRating: result.averageRating
        ? parseFloat(result.averageRating)
        : 0,
      totalComments: parseInt(result.totalComments) || 0,
    };
  }
}
