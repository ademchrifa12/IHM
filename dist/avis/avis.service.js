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
exports.AvisService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const avis_entity_1 = require("../entities/avis.entity");
const commentaire_entity_1 = require("../entities/commentaire.entity");
const note_entity_1 = require("../entities/note.entity");
const reservation_entity_1 = require("../entities/reservation.entity");
const reservation_entity_2 = require("../entities/reservation.entity");
let AvisService = class AvisService {
    avisRepository;
    commentaireRepository;
    noteRepository;
    reservationRepository;
    constructor(avisRepository, commentaireRepository, noteRepository, reservationRepository) {
        this.avisRepository = avisRepository;
        this.commentaireRepository = commentaireRepository;
        this.noteRepository = noteRepository;
        this.reservationRepository = reservationRepository;
    }
    async create(createAvisDto) {
        const reservation = await this.reservationRepository.findOne({
            where: { idReservation: createAvisDto.idReservation },
        });
        if (!reservation) {
            throw new common_1.NotFoundException('Réservation non trouvée');
        }
        if (reservation.statut !== reservation_entity_2.ReservationStatus.COMPLETED) {
            throw new common_1.BadRequestException('Les avis ne peuvent être ajoutés que pour les réservations complétées');
        }
        let avis;
        if (createAvisDto.typeAvis === avis_entity_1.AvisType.COMMENTAIRE) {
            if (!createAvisDto.contenu) {
                throw new common_1.BadRequestException('Un commentaire doit contenir du texte');
            }
            avis = this.commentaireRepository.create({
                ...createAvisDto,
                reservation,
            });
            avis = await this.commentaireRepository.save(avis);
        }
        else if (createAvisDto.typeAvis === avis_entity_1.AvisType.NOTE) {
            avis = this.noteRepository.create({
                note: createAvisDto.note,
                idReservation: createAvisDto.idReservation,
                reservation,
                typeAvis: avis_entity_1.AvisType.NOTE,
            });
            avis = await this.noteRepository.save(avis);
        }
        else {
            throw new common_1.BadRequestException('Type d\'avis invalide');
        }
        return avis;
    }
    async findAll(filters) {
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
    async findCommentaires(idReservation) {
        return this.findAll({
            idReservation,
            typeAvis: avis_entity_1.AvisType.COMMENTAIRE,
        });
    }
    async findNotes(idReservation) {
        return this.findAll({
            idReservation,
            typeAvis: avis_entity_1.AvisType.NOTE,
        });
    }
    async findOne(idAvis) {
        const avis = await this.avisRepository.findOne({
            where: { idAvis },
            relations: ['reservation'],
        });
        if (!avis) {
            throw new common_1.NotFoundException(`Avis ${idAvis} non trouvé`);
        }
        return avis;
    }
    async update(idAvis, updateAvisDto) {
        const avis = await this.findOne(idAvis);
        if (updateAvisDto.note !== undefined) {
            avis.note = updateAvisDto.note;
        }
        if (updateAvisDto.contenu !== undefined && avis.typeAvis === avis_entity_1.AvisType.COMMENTAIRE) {
            avis.contenu = updateAvisDto.contenu;
        }
        return this.avisRepository.save(avis);
    }
    async remove(idAvis) {
        const avis = await this.findOne(idAvis);
        await this.avisRepository.remove(avis);
    }
    async findByReservation(idReservation) {
        return this.avisRepository.find({
            where: { idReservation },
            order: { dateCreation: 'DESC' },
        });
    }
    async getAverageNote(idReservation) {
        const result = await this.avisRepository
            .createQueryBuilder('avis')
            .select('AVG(avis.note)', 'average')
            .where('avis.idReservation = :idReservation', { idReservation })
            .andWhere('avis.note IS NOT NULL')
            .getRawOne();
        return result?.average ? parseFloat(result.average) : 0;
    }
    async reportAvis(idAvis) {
        const avis = await this.findOne(idAvis);
        avis.nombreSignalement += 1;
        if (avis.nombreSignalement >= 3) {
            avis.estVisible = false;
        }
        return this.avisRepository.save(avis);
    }
    async toggleVisibility(idAvis) {
        const avis = await this.findOne(idAvis);
        avis.estVisible = !avis.estVisible;
        return this.avisRepository.save(avis);
    }
};
exports.AvisService = AvisService;
exports.AvisService = AvisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(avis_entity_1.Avis)),
    __param(1, (0, typeorm_1.InjectRepository)(commentaire_entity_1.Commentaire)),
    __param(2, (0, typeorm_1.InjectRepository)(note_entity_1.Note)),
    __param(3, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AvisService);
//# sourceMappingURL=avis.service.js.map