import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { Categorie } from '../entities/categorie.entity';
import { Region } from '../entities/region.entity';

export class CreateServiceDto {
  titre: string;
  description: string;
  prix: number;
  experienceRequise: string;
  imageUrl?: string;
  idPrestataire: string;
}

export class UpdateServiceDto {
  titre?: string;
  description?: string;
  prix?: number;
  experienceRequise?: string;
  imageUrl?: string;
}

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(Categorie)
    private categoriesRepository: Repository<Categorie>,
    @InjectRepository(Region)
    private regionsRepository: Repository<Region>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    if (
      !createServiceDto.titre ||
      !createServiceDto.description ||
      createServiceDto.prix <= 0
    ) {
      throw new BadRequestException('Invalid service data');
    }

    const service = this.servicesRepository.create(createServiceDto);
    return this.servicesRepository.save(service);
  }

  async findAll(
    limit: number = 10,
    offset: number = 0,
  ): Promise<{ data: Service[]; total: number }> {
    const [data, total] = await this.servicesRepository.findAndCount({
      where: { estValide: true },
      relations: ['prestataire', 'categories', 'regions'],
      take: limit,
      skip: offset,
      order: { dateCreation: 'DESC' },
    });

    return { data, total };
  }

  async findById(id: string): Promise<Service> {
    const service = await this.servicesRepository.findOne({
      where: { idService: id },
      relations: ['prestataire', 'categories', 'regions'],
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  async findByPrestataire(idPrestataire: string): Promise<Service[]> {
    return this.servicesRepository.find({
      where: { idPrestataire },
      relations: ['categories', 'regions'],
      order: { dateCreation: 'DESC' },
    });
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
    const service = await this.findById(id);

    Object.assign(service, updateServiceDto);
    return this.servicesRepository.save(service);
  }

  async delete(id: string): Promise<void> {
    const result = await this.servicesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Service not found');
    }
  }

  async search(
    query: string,
    categorieId?: string,
    regionId?: string,
    limit: number = 10,
    offset: number = 0,
  ): Promise<{ data: Service[]; total: number }> {
    let queryBuilder = this.servicesRepository.createQueryBuilder('service');

    if (query) {
      queryBuilder = queryBuilder.where(
        'service.titre ILIKE :query OR service.description ILIKE :query',
        { query: `%${query}%` },
      );
    }

    if (categorieId) {
      queryBuilder = queryBuilder.leftJoinAndSelect(
        'service.categories',
        'categorie',
        'categorie.idCategorie = :categorieId',
        { categorieId },
      );
    }

    if (regionId) {
      queryBuilder = queryBuilder.leftJoinAndSelect(
        'service.regions',
        'region',
        'region.idRegion = :regionId',
        { regionId },
      );
    }

    queryBuilder = queryBuilder
      .andWhere('service.estValide = true')
      .orderBy('service.dateCreation', 'DESC')
      .skip(offset)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }

  async addCategory(serviceId: string, categoryId: string): Promise<Service> {
    const service = await this.findById(serviceId);
    const category = await this.categoriesRepository.findOne({
      where: { idCategorie: categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (!service.serviceCategories) {
      service.serviceCategories = [];
    }

    const serviceCategory = service.serviceCategories?.find(
      (sc: any) => sc.categorie?.idCategorie === categoryId,
    );
    if (!serviceCategory) {
      const newServiceCategory = new (require('../entities/service-categorie.entity').ServiceCategorie)();
      newServiceCategory.service = service;
      newServiceCategory.categorie = category;
      service.serviceCategories.push(newServiceCategory);
    }

    return this.servicesRepository.save(service);
  }

  async addRegion(serviceId: string, regionId: string): Promise<Service> {
    const service = await this.findById(serviceId);
    const region = await this.regionsRepository.findOne({
      where: { idRegion: regionId },
    });

    if (!region) {
      throw new NotFoundException('Region not found');
    }

    if (!service.regions) {
      service.regions = [];
    }

    if (!service.regions.find((r) => r.idRegion === regionId)) {
      service.regions.push(region);
    }

    return this.servicesRepository.save(service);
  }
}
