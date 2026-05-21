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
exports.DisponibiliteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const disponibilite_entity_1 = require("../entities/disponibilite.entity");
const prestataire_entity_1 = require("../entities/prestataire.entity");
let DisponibiliteService = class DisponibiliteService {
    disponibiliteRepository;
    prestaiaireRepository;
    constructor(disponibiliteRepository, prestaiaireRepository) {
        this.disponibiliteRepository = disponibiliteRepository;
        this.prestaiaireRepository = prestaiaireRepository;
    }
    async create(createDisponibiliteDto) {
        const prestataire = await this.prestaiaireRepository.findOne({
            where: { idPrestataire: createDisponibiliteDto.idPrestataire },
        });
        if (!prestataire) {
            throw new common_1.NotFoundException('Prestataire non trouvé');
        }
        if (createDisponibiliteDto.heureDebut >= createDisponibiliteDto.heureFin) {
            throw new common_1.BadRequestException('L\'heure de début doit être antérieure à l\'heure de fin');
        }
        if (!createDisponibiliteDto.joursDisponibles || createDisponibiliteDto.joursDisponibles.length === 0) {
            throw new common_1.BadRequestException('Au moins un jour doit être sélectionné');
        }
        const disponibilite = this.disponibiliteRepository.create({
            ...createDisponibiliteDto,
            prestataire,
        });
        return this.disponibiliteRepository.save(disponibilite);
    }
    async findAll(filters) {
        const query = this.disponibiliteRepository.createQueryBuilder('dispo');
        if (filters?.idPrestataire) {
            query.where('dispo.idPrestataire = :idPrestataire', {
                idPrestataire: filters.idPrestataire,
            });
        }
        return query.orderBy('dispo.heureDebut', 'ASC').getMany();
    }
    async findOne(idDisponibilite) {
        const disponibilite = await this.disponibiliteRepository.findOne({
            where: { idDisponibilite },
            relations: ['prestataire'],
        });
        if (!disponibilite) {
            throw new common_1.NotFoundException(`Disponibilité ${idDisponibilite} non trouvée`);
        }
        return disponibilite;
    }
    async findByPrestataire(idPrestataire) {
        const prestataire = await this.prestaiaireRepository.findOne({
            where: { idPrestataire },
        });
        if (!prestataire) {
            throw new common_1.NotFoundException('Prestataire non trouvé');
        }
        return this.findAll({ idPrestataire });
    }
    async update(idDisponibilite, updateDisponibiliteDto) {
        const disponibilite = await this.findOne(idDisponibilite);
        if (updateDisponibiliteDto.joursDisponibles) {
            if (updateDisponibiliteDto.joursDisponibles.length === 0) {
                throw new common_1.BadRequestException('Au moins un jour doit être sélectionné');
            }
            disponibilite.joursDisponibles = updateDisponibiliteDto.joursDisponibles;
        }
        if (updateDisponibiliteDto.heureDebut) {
            disponibilite.heureDebut = updateDisponibiliteDto.heureDebut;
        }
        if (updateDisponibiliteDto.heureFin) {
            disponibilite.heureFin = updateDisponibiliteDto.heureFin;
        }
        if (disponibilite.heureDebut >= disponibilite.heureFin) {
            throw new common_1.BadRequestException('L\'heure de début doit être antérieure à l\'heure de fin');
        }
        if (updateDisponibiliteDto.estActive !== undefined) {
            disponibilite.estActive = updateDisponibiliteDto.estActive;
        }
        if (updateDisponibiliteDto.notes !== undefined) {
            disponibilite.notes = updateDisponibiliteDto.notes;
        }
        return this.disponibiliteRepository.save(disponibilite);
    }
    async remove(idDisponibilite) {
        const disponibilite = await this.findOne(idDisponibilite);
        await this.disponibiliteRepository.remove(disponibilite);
    }
    async findActiveForDay(idPrestataire, dayOfWeek) {
        const disponibilites = await this.disponibiliteRepository
            .createQueryBuilder('dispo')
            .where('dispo.idPrestataire = :idPrestataire', { idPrestataire })
            .andWhere('dispo.estActive = :estActive', { estActive: true })
            .getMany();
        return disponibilites.filter((dispo) => dispo.joursDisponibles.includes(dayOfWeek));
    }
    async isAvailable(idPrestataire, date, heureDebut, heureFin) {
        const dayOfWeek = date.getDay();
        const disponibilites = await this.findActiveForDay(idPrestataire, dayOfWeek);
        return disponibilites.some((dispo) => {
            return (dispo.heureDebut <= heureDebut && dispo.heureFin >= heureFin);
        });
    }
};
exports.DisponibiliteService = DisponibiliteService;
exports.DisponibiliteService = DisponibiliteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(disponibilite_entity_1.Disponibilite)),
    __param(1, (0, typeorm_1.InjectRepository)(prestataire_entity_1.Prestataire)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DisponibiliteService);
//# sourceMappingURL=disponibilite.service.js.map