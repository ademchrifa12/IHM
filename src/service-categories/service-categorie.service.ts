import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceCategorie } from '../entities/service-categorie.entity';
import { Service } from '../entities/service.entity';
import { Categorie } from '../entities/categorie.entity';
import { CreateServiceCategorieDto, UpdateServiceCategorieDto } from '../dto';

/**
 * Service pour la gestion des relations Service-Categorie (composition)
 * Gère l'entité intermédiaire S.Categorie qui représente la relation
 * de composition entre Categorie et Service
 */
@Injectable()
export class ServiceCategorieService {
  constructor(
    @InjectRepository(ServiceCategorie)
    private serviceCategorieRepository: Repository<ServiceCategorie>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(Categorie)
    private categorieRepository: Repository<Categorie>,
  ) {}

  /**
   * Crée une nouvelle relation Service-Categorie (composition)
   */
  async create(
    createServiceCategorieDto: CreateServiceCategorieDto,
  ): Promise<ServiceCategorie> {
    // Vérifier que le service existe
    const service = await this.serviceRepository.findOne({
      where: { idService: createServiceCategorieDto.idService },
    });

    if (!service) {
      throw new NotFoundException('Service non trouvé');
    }

    // Vérifier que la catégorie existe
    const categorie = await this.categorieRepository.findOne({
      where: { idCategorie: createServiceCategorieDto.idCategorie },
    });

    if (!categorie) {
      throw new NotFoundException('Catégorie non trouvée');
    }

    // Vérifier qu'il n'existe pas déjà une relation pour cette paire
    const existing = await this.serviceCategorieRepository.findOne({
      where: {
        idService: createServiceCategorieDto.idService,
        idCategorie: createServiceCategorieDto.idCategorie,
      },
    });

    if (existing) {
      throw new BadRequestException(
        'Cette relation Service-Categorie existe déjà',
      );
    }

    const serviceCategorie = this.serviceCategorieRepository.create({
      ...createServiceCategorieDto,
      service,
      categorie,
    });

    return this.serviceCategorieRepository.save(serviceCategorie);
  }

  /**
   * Récupère toutes les relations Service-Categorie
   */
  async findAll(filters?: {
    idService?: string;
    idCategorie?: string;
  }): Promise<ServiceCategorie[]> {
    const query = this.serviceCategorieRepository
      .createQueryBuilder('scategorie')
      .leftJoinAndSelect('scategorie.service', 'service')
      .leftJoinAndSelect('scategorie.categorie', 'categorie');

    if (filters?.idService) {
      query.where('scategorie.idService = :idService', {
        idService: filters.idService,
      });
    }

    if (filters?.idCategorie) {
      query.andWhere('scategorie.idCategorie = :idCategorie', {
        idCategorie: filters.idCategorie,
      });
    }

    return query.orderBy('scategorie.dateCreation', 'DESC').getMany();
  }

  /**
   * Récupère une relation Service-Categorie par ID
   */
  async findOne(idServiceCategorie: string): Promise<ServiceCategorie> {
    const serviceCategorie = await this.serviceCategorieRepository.findOne({
      where: { idServiceCategorie },
      relations: ['service', 'categorie'],
    });

    if (!serviceCategorie) {
      throw new NotFoundException(
        `Relation Service-Categorie ${idServiceCategorie} non trouvée`,
      );
    }

    return serviceCategorie;
  }

  /**
   * Récupère les catégories d'un service
   */
  async findByService(idService: string): Promise<ServiceCategorie[]> {
    return this.findAll({ idService });
  }

  /**
   * Récupère les services d'une catégorie
   */
  async findByCategorie(idCategorie: string): Promise<ServiceCategorie[]> {
    return this.findAll({ idCategorie });
  }

  /**
   * Modifie une relation Service-Categorie
   */
  async update(
    idServiceCategorie: string,
    updateServiceCategorieDto: UpdateServiceCategorieDto,
  ): Promise<ServiceCategorie> {
    const serviceCategorie = await this.findOne(idServiceCategorie);

    if (updateServiceCategorieDto.nom) {
      serviceCategorie.nom = updateServiceCategorieDto.nom;
    }

    if (updateServiceCategorieDto.description !== undefined) {
      serviceCategorie.description = updateServiceCategorieDto.description;
    }

    return this.serviceCategorieRepository.save(serviceCategorie);
  }

  /**
   * Supprime une relation Service-Categorie
   */
  async remove(idServiceCategorie: string): Promise<void> {
    const serviceCategorie = await this.findOne(idServiceCategorie);
    await this.serviceCategorieRepository.remove(serviceCategorie);
  }

  /**
   * Ajoute une categorie à un service
   */
  async addCategorieToService(
    idService: string,
    idCategorie: string,
    nom?: string,
  ): Promise<ServiceCategorie> {
    return this.create({
      idService,
      idCategorie,
      nom: nom || 'Non spécifié',
    });
  }

  /**
   * Retire une categorie d'un service
   */
  async removeCategorieFromService(
    idService: string,
    idCategorie: string,
  ): Promise<void> {
    const serviceCategorie = await this.serviceCategorieRepository.findOne({
      where: {
        idService,
        idCategorie,
      },
    });

    if (!serviceCategorie) {
      throw new NotFoundException(
        'Cette relation Service-Categorie n\'existe pas',
      );
    }

    await this.serviceCategorieRepository.remove(serviceCategorie);
  }

  /**
   * Récupère le nombre de services par catégorie
   */
  async countServicesByCategorie(idCategorie: string): Promise<number> {
    return this.serviceCategorieRepository.count({
      where: { idCategorie },
    });
  }
}
