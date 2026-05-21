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
exports.ServiceCategorieService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const service_categorie_entity_1 = require("../entities/service-categorie.entity");
const service_entity_1 = require("../entities/service.entity");
const categorie_entity_1 = require("../entities/categorie.entity");
let ServiceCategorieService = class ServiceCategorieService {
    serviceCategorieRepository;
    serviceRepository;
    categorieRepository;
    constructor(serviceCategorieRepository, serviceRepository, categorieRepository) {
        this.serviceCategorieRepository = serviceCategorieRepository;
        this.serviceRepository = serviceRepository;
        this.categorieRepository = categorieRepository;
    }
    async create(createServiceCategorieDto) {
        const service = await this.serviceRepository.findOne({
            where: { idService: createServiceCategorieDto.idService },
        });
        if (!service) {
            throw new common_1.NotFoundException('Service non trouvé');
        }
        const categorie = await this.categorieRepository.findOne({
            where: { idCategorie: createServiceCategorieDto.idCategorie },
        });
        if (!categorie) {
            throw new common_1.NotFoundException('Catégorie non trouvée');
        }
        const existing = await this.serviceCategorieRepository.findOne({
            where: {
                idService: createServiceCategorieDto.idService,
                idCategorie: createServiceCategorieDto.idCategorie,
            },
        });
        if (existing) {
            throw new common_1.BadRequestException('Cette relation Service-Categorie existe déjà');
        }
        const serviceCategorie = this.serviceCategorieRepository.create({
            ...createServiceCategorieDto,
            service,
            categorie,
        });
        return this.serviceCategorieRepository.save(serviceCategorie);
    }
    async findAll(filters) {
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
    async findOne(idServiceCategorie) {
        const serviceCategorie = await this.serviceCategorieRepository.findOne({
            where: { idServiceCategorie },
            relations: ['service', 'categorie'],
        });
        if (!serviceCategorie) {
            throw new common_1.NotFoundException(`Relation Service-Categorie ${idServiceCategorie} non trouvée`);
        }
        return serviceCategorie;
    }
    async findByService(idService) {
        return this.findAll({ idService });
    }
    async findByCategorie(idCategorie) {
        return this.findAll({ idCategorie });
    }
    async update(idServiceCategorie, updateServiceCategorieDto) {
        const serviceCategorie = await this.findOne(idServiceCategorie);
        if (updateServiceCategorieDto.nom) {
            serviceCategorie.nom = updateServiceCategorieDto.nom;
        }
        if (updateServiceCategorieDto.description !== undefined) {
            serviceCategorie.description = updateServiceCategorieDto.description;
        }
        return this.serviceCategorieRepository.save(serviceCategorie);
    }
    async remove(idServiceCategorie) {
        const serviceCategorie = await this.findOne(idServiceCategorie);
        await this.serviceCategorieRepository.remove(serviceCategorie);
    }
    async addCategorieToService(idService, idCategorie, nom) {
        return this.create({
            idService,
            idCategorie,
            nom: nom || 'Non spécifié',
        });
    }
    async removeCategorieFromService(idService, idCategorie) {
        const serviceCategorie = await this.serviceCategorieRepository.findOne({
            where: {
                idService,
                idCategorie,
            },
        });
        if (!serviceCategorie) {
            throw new common_1.NotFoundException('Cette relation Service-Categorie n\'existe pas');
        }
        await this.serviceCategorieRepository.remove(serviceCategorie);
    }
    async countServicesByCategorie(idCategorie) {
        return this.serviceCategorieRepository.count({
            where: { idCategorie },
        });
    }
};
exports.ServiceCategorieService = ServiceCategorieService;
exports.ServiceCategorieService = ServiceCategorieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_categorie_entity_1.ServiceCategorie)),
    __param(1, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __param(2, (0, typeorm_1.InjectRepository)(categorie_entity_1.Categorie)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ServiceCategorieService);
//# sourceMappingURL=service-categorie.service.js.map