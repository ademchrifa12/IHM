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
exports.CommentairesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const commentaire_entity_1 = require("../entities/commentaire.entity");
const avis_entity_1 = require("../entities/avis.entity");
const reservation_entity_1 = require("../entities/reservation.entity");
let CommentairesService = class CommentairesService {
    commentaireRepository;
    avisRepository;
    reservationRepository;
    constructor(commentaireRepository, avisRepository, reservationRepository) {
        this.commentaireRepository = commentaireRepository;
        this.avisRepository = avisRepository;
        this.reservationRepository = reservationRepository;
    }
    async create(createCommentaireDto) {
        if (!createCommentaireDto.note ||
            !createCommentaireDto.contenu ||
            createCommentaireDto.note < 1 ||
            createCommentaireDto.note > 5) {
            throw new common_1.BadRequestException('Données de commentaire invalides. La note doit être entre 1 et 5');
        }
        const reservation = await this.reservationRepository.findOne({
            where: {
                idClient: createCommentaireDto.idClient,
                idService: createCommentaireDto.idService,
                statut: reservation_entity_1.ReservationStatus.COMPLETED,
            },
        });
        if (!reservation) {
            throw new common_1.BadRequestException('Aucune réservation complétée trouvée entre ce client et ce service');
        }
        const commentaire = this.commentaireRepository.create({
            note: createCommentaireDto.note,
            contenu: createCommentaireDto.contenu,
            idReservation: reservation.idReservation,
            typeAvis: avis_entity_1.AvisType.COMMENTAIRE,
            estVisible: true,
            nombreSignalement: 0,
        });
        return this.commentaireRepository.save(commentaire);
    }
    async findAll(limit = 10, offset = 0) {
        const [data, total] = await this.avisRepository
            .createQueryBuilder('avis')
            .where('avis.typeAvis = :typeAvis', { typeAvis: avis_entity_1.AvisType.COMMENTAIRE })
            .andWhere('avis.estVisible = :estVisible', { estVisible: true })
            .leftJoinAndSelect('avis.reservation', 'reservation')
            .leftJoinAndSelect('reservation.client', 'client')
            .leftJoinAndSelect('reservation.service', 'service')
            .take(limit)
            .skip(offset)
            .orderBy('avis.dateCreation', 'DESC')
            .getManyAndCount();
        return { data: data, total };
    }
    async findById(id) {
        const commentaire = await this.avisRepository.findOne({
            where: { idAvis: id, typeAvis: avis_entity_1.AvisType.COMMENTAIRE },
            relations: ['reservation', 'reservation.client', 'reservation.service'],
        });
        if (!commentaire) {
            throw new common_1.NotFoundException('Commentaire non trouvé');
        }
        return commentaire;
    }
    async findByService(idService) {
        return this.avisRepository
            .createQueryBuilder('avis')
            .where('avis.typeAvis = :typeAvis', { typeAvis: avis_entity_1.AvisType.COMMENTAIRE })
            .andWhere('avis.estVisible = :estVisible', { estVisible: true })
            .leftJoinAndSelect('avis.reservation', 'reservation')
            .leftJoinAndSelect('reservation.service', 'service')
            .andWhere('reservation.idService = :idService', { idService })
            .orderBy('avis.dateCreation', 'DESC')
            .getMany();
    }
    async findByClient(idClient) {
        return this.avisRepository
            .createQueryBuilder('avis')
            .where('avis.typeAvis = :typeAvis', { typeAvis: avis_entity_1.AvisType.COMMENTAIRE })
            .leftJoinAndSelect('avis.reservation', 'reservation')
            .leftJoinAndSelect('reservation.service', 'service')
            .andWhere('reservation.idClient = :idClient', { idClient })
            .orderBy('avis.dateCreation', 'DESC')
            .getMany();
    }
    async update(id, updateCommentaireDto) {
        const commentaire = await this.findById(id);
        if (updateCommentaireDto.note) {
            if (updateCommentaireDto.note < 1 || updateCommentaireDto.note > 5) {
                throw new common_1.BadRequestException('La note doit être entre 1 et 5');
            }
            commentaire.note = updateCommentaireDto.note;
        }
        if (updateCommentaireDto.contenu) {
            commentaire.contenu = updateCommentaireDto.contenu;
        }
        return this.avisRepository.save(commentaire);
    }
    async delete(id) {
        const commentaire = await this.findById(id);
        await this.avisRepository.remove(commentaire);
    }
    async toggleVisibility(id, visible) {
        const commentaire = await this.findById(id);
        commentaire.estVisible = visible;
        return this.avisRepository.save(commentaire);
    }
    async reportComment(id) {
        const commentaire = await this.findById(id);
        commentaire.nombreSignalement += 1;
        if (commentaire.nombreSignalement >= 3) {
            commentaire.estVisible = false;
        }
        return this.avisRepository.save(commentaire);
    }
    async getServiceRating(idService) {
        const result = await this.avisRepository
            .createQueryBuilder('avis')
            .where('avis.typeAvis = :typeAvis', { typeAvis: avis_entity_1.AvisType.COMMENTAIRE })
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
};
exports.CommentairesService = CommentairesService;
exports.CommentairesService = CommentairesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(commentaire_entity_1.Commentaire)),
    __param(1, (0, typeorm_1.InjectRepository)(avis_entity_1.Avis)),
    __param(2, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommentairesService);
//# sourceMappingURL=commentaires.service.js.map