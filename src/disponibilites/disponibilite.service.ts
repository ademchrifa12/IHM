import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disponibilite } from '../entities/disponibilite.entity';
import { Prestataire } from '../entities/prestataire.entity';
import { CreateDisponibiliteDto, UpdateDisponibiliteDto } from '../dto';

/**
 * Service pour la gestion des disponibilités des prestataires
 */
@Injectable()
export class DisponibiliteService {
  constructor(
    @InjectRepository(Disponibilite)
    private disponibiliteRepository: Repository<Disponibilite>,
    @InjectRepository(Prestataire)
    private prestaiaireRepository: Repository<Prestataire>,
  ) {}

  /**
   * Crée une nouvelle disponibilité
   */
  async create(
    createDisponibiliteDto: CreateDisponibiliteDto,
  ): Promise<Disponibilite> {
    const prestataire = await this.prestaiaireRepository.findOne({
      where: { idPrestataire: createDisponibiliteDto.idPrestataire },
    });

    if (!prestataire) {
      throw new NotFoundException('Prestataire non trouvé');
    }

    // Validation : heureDebut < heureFin
    if (createDisponibiliteDto.heureDebut >= createDisponibiliteDto.heureFin) {
      throw new BadRequestException(
        'L\'heure de début doit être antérieure à l\'heure de fin',
      );
    }

    // Validation : au moins un jour doit être sélectionné
    if (!createDisponibiliteDto.joursDisponibles || createDisponibiliteDto.joursDisponibles.length === 0) {
      throw new BadRequestException('Au moins un jour doit être sélectionné');
    }

    const disponibilite = this.disponibiliteRepository.create({
      ...createDisponibiliteDto,
      prestataire,
    });

    return this.disponibiliteRepository.save(disponibilite);
  }

  /**
   * Récupère toutes les disponibilités
   */
  async findAll(filters?: { idPrestataire?: string }): Promise<Disponibilite[]> {
    const query = this.disponibiliteRepository.createQueryBuilder('dispo');

    if (filters?.idPrestataire) {
      query.where('dispo.idPrestataire = :idPrestataire', {
        idPrestataire: filters.idPrestataire,
      });
    }

    return query.orderBy('dispo.heureDebut', 'ASC').getMany();
  }

  /**
   * Récupère une disponibilité par ID
   */
  async findOne(idDisponibilite: string): Promise<Disponibilite> {
    const disponibilite = await this.disponibiliteRepository.findOne({
      where: { idDisponibilite },
      relations: ['prestataire'],
    });

    if (!disponibilite) {
      throw new NotFoundException(`Disponibilité ${idDisponibilite} non trouvée`);
    }

    return disponibilite;
  }

  /**
   * Récupère les disponibilités d'un prestataire
   */
  async findByPrestataire(idPrestataire: string): Promise<Disponibilite[]> {
    const prestataire = await this.prestaiaireRepository.findOne({
      where: { idPrestataire },
    });

    if (!prestataire) {
      throw new NotFoundException('Prestataire non trouvé');
    }

    return this.findAll({ idPrestataire });
  }

  /**
   * Modifie une disponibilité
   */
  async update(
    idDisponibilite: string,
    updateDisponibiliteDto: UpdateDisponibiliteDto,
  ): Promise<Disponibilite> {
    const disponibilite = await this.findOne(idDisponibilite);

    if (updateDisponibiliteDto.joursDisponibles) {
      if (updateDisponibiliteDto.joursDisponibles.length === 0) {
        throw new BadRequestException('Au moins un jour doit être sélectionné');
      }
      disponibilite.joursDisponibles = updateDisponibiliteDto.joursDisponibles;
    }

    if (updateDisponibiliteDto.heureDebut) {
      disponibilite.heureDebut = updateDisponibiliteDto.heureDebut;
    }

    if (updateDisponibiliteDto.heureFin) {
      disponibilite.heureFin = updateDisponibiliteDto.heureFin;
    }

    // Validation finale
    if (disponibilite.heureDebut >= disponibilite.heureFin) {
      throw new BadRequestException(
        'L\'heure de début doit être antérieure à l\'heure de fin',
      );
    }

    if (updateDisponibiliteDto.estActive !== undefined) {
      disponibilite.estActive = updateDisponibiliteDto.estActive;
    }

    if (updateDisponibiliteDto.notes !== undefined) {
      disponibilite.notes = updateDisponibiliteDto.notes;
    }

    return this.disponibiliteRepository.save(disponibilite);
  }

  /**
   * Supprime une disponibilité
   */
  async remove(idDisponibilite: string): Promise<void> {
    const disponibilite = await this.findOne(idDisponibilite);
    await this.disponibiliteRepository.remove(disponibilite);
  }

  /**
   * Récupère les disponibilités actives d'un prestataire pour un jour donné
   */
  async findActiveForDay(
    idPrestataire: string,
    dayOfWeek: number,
  ): Promise<Disponibilite[]> {
    const disponibilites = await this.disponibiliteRepository
      .createQueryBuilder('dispo')
      .where('dispo.idPrestataire = :idPrestataire', { idPrestataire })
      .andWhere('dispo.estActive = :estActive', { estActive: true })
      .getMany();

    return disponibilites.filter((dispo) =>
      dispo.joursDisponibles.includes(dayOfWeek),
    );
  }

  /**
   * Vérifie la disponibilité à une date/heure précise
   */
  async isAvailable(
    idPrestataire: string,
    date: Date,
    heureDebut: string,
    heureFin: string,
  ): Promise<boolean> {
    const dayOfWeek = date.getDay();
    const disponibilites = await this.findActiveForDay(idPrestataire, dayOfWeek);

    return disponibilites.some((dispo) => {
      return (
        dispo.heureDebut <= heureDebut && dispo.heureFin >= heureFin
      );
    });
  }
}
