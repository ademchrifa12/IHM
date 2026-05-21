"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = exports.UpdateServiceDto = exports.CreateServiceDto = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const service_entity_1 = require("../entities/service.entity");
const categorie_entity_1 = require("../entities/categorie.entity");
const region_entity_1 = require("../entities/region.entity");
class CreateServiceDto {
    titre;
    description;
    prix;
    experienceRequise;
    imageUrl;
    idPrestataire;
}
exports.CreateServiceDto = CreateServiceDto;
class UpdateServiceDto {
    titre;
    description;
    prix;
    experienceRequise;
    imageUrl;
}
exports.UpdateServiceDto = UpdateServiceDto;
let ServicesService = class ServicesService {
    servicesRepository;
    categoriesRepository;
    regionsRepository;
    constructor(servicesRepository, categoriesRepository, regionsRepository) {
        this.servicesRepository = servicesRepository;
        this.categoriesRepository = categoriesRepository;
        this.regionsRepository = regionsRepository;
    }
    async create(createServiceDto) {
        if (!createServiceDto.titre ||
            !createServiceDto.description ||
            createServiceDto.prix <= 0) {
            throw new common_1.BadRequestException('Invalid service data');
        }
        const service = this.servicesRepository.create(createServiceDto);
        return this.servicesRepository.save(service);
    }
    async findAll(limit = 10, offset = 0) {
        const [data, total] = await this.servicesRepository.findAndCount({
            where: { estValide: true },
            relations: ['prestataire', 'categories', 'regions'],
            take: limit,
            skip: offset,
            order: { dateCreation: 'DESC' },
        });
        return { data, total };
    }
    async findById(id) {
        const service = await this.servicesRepository.findOne({
            where: { idService: id },
            relations: ['prestataire', 'categories', 'regions'],
        });
        if (!service) {
            throw new common_1.NotFoundException('Service not found');
        }
        return service;
    }
    async findByPrestataire(idPrestataire) {
        return this.servicesRepository.find({
            where: { idPrestataire },
            relations: ['categories', 'regions'],
            order: { dateCreation: 'DESC' },
        });
    }
    async update(id, updateServiceDto) {
        const service = await this.findById(id);
        Object.assign(service, updateServiceDto);
        return this.servicesRepository.save(service);
    }
    async delete(id) {
        const result = await this.servicesRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Service not found');
        }
    }
    async search(query, categorieId, regionId, limit = 10, offset = 0) {
        let queryBuilder = this.servicesRepository.createQueryBuilder('service');
        if (query) {
            queryBuilder = queryBuilder.where('service.titre ILIKE :query OR service.description ILIKE :query', { query: `%${query}%` });
        }
        if (categorieId) {
            queryBuilder = queryBuilder.leftJoinAndSelect('service.categories', 'categorie', 'categorie.idCategorie = :categorieId', { categorieId });
        }
        if (regionId) {
            queryBuilder = queryBuilder.leftJoinAndSelect('service.regions', 'region', 'region.idRegion = :regionId', { regionId });
        }
        queryBuilder = queryBuilder
            .andWhere('service.estValide = true')
            .orderBy('service.dateCreation', 'DESC')
            .skip(offset)
            .take(limit);
        const [data, total] = await queryBuilder.getManyAndCount();
        return { data, total };
    }
    async addCategory(serviceId, categoryId) {
        const service = await this.findById(serviceId);
        const category = await this.categoriesRepository.findOne({
            where: { idCategorie: categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        if (!service.serviceCategories) {
            service.serviceCategories = [];
        }
        const serviceCategory = service.serviceCategories?.find((sc) => sc.categorie?.idCategorie === categoryId);
        if (!serviceCategory) {
            const newServiceCategory = new (require('../entities/service-categorie.entity').ServiceCategorie)();
            newServiceCategory.service = service;
            newServiceCategory.categorie = category;
            service.serviceCategories.push(newServiceCategory);
        }
        return this.servicesRepository.save(service);
    }
    async addRegion(serviceId, regionId) {
        const service = await this.findById(serviceId);
        const region = await this.regionsRepository.findOne({
            where: { idRegion: regionId },
        });
        if (!region) {
            throw new common_1.NotFoundException('Region not found');
        }
        if (!service.regions) {
            service.regions = [];
        }
        if (!service.regions.find((r) => r.idRegion === regionId)) {
            service.regions.push(region);
        }
        return this.servicesRepository.save(service);
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __param(1, (0, typeorm_1.InjectRepository)(categorie_entity_1.Categorie)),
    __param(2, (0, typeorm_1.InjectRepository)(region_entity_1.Region)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ServicesService);
//# sourceMappingURL=services.service.js.map