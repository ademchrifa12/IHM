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
exports.ReservationsService = exports.CreateReservationDto = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reservation_entity_1 = require("../entities/reservation.entity");
class CreateReservationDto {
    dateReservation;
    dateExecution;
    idService;
    idClient;
    idPrestataire;
    notes;
}
exports.CreateReservationDto = CreateReservationDto;
let ReservationsService = class ReservationsService {
    reservationsRepository;
    constructor(reservationsRepository) {
        this.reservationsRepository = reservationsRepository;
    }
    async create(createReservationDto) {
        if (!createReservationDto.idService || !createReservationDto.idClient) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        const reservation = this.reservationsRepository.create({
            ...createReservationDto,
            statut: reservation_entity_1.ReservationStatus.PENDING,
        });
        return this.reservationsRepository.save(reservation);
    }
    async findAll(limit = 10, offset = 0) {
        const [data, total] = await this.reservationsRepository.findAndCount({
            relations: ['client', 'prestataire', 'service'],
            take: limit,
            skip: offset,
            order: { dateCreation: 'DESC' },
        });
        return { data, total };
    }
    async findById(id) {
        const reservation = await this.reservationsRepository.findOne({
            where: { idReservation: id },
            relations: ['client', 'prestataire', 'service'],
        });
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        return reservation;
    }
    async findByClient(idClient) {
        return this.reservationsRepository.find({
            where: { idClient },
            relations: ['service', 'prestataire'],
            order: { dateCreation: 'DESC' },
        });
    }
    async findByPrestataire(idPrestataire) {
        return this.reservationsRepository.find({
            where: { idPrestataire },
            relations: ['client', 'service'],
            order: { dateCreation: 'DESC' },
        });
    }
    async updateStatus(id, status) {
        const reservation = await this.findById(id);
        reservation.statut = status;
        if (status === reservation_entity_1.ReservationStatus.COMPLETED) {
            reservation.dateExecution = new Date();
        }
        return this.reservationsRepository.save(reservation);
    }
    async delete(id) {
        const result = await this.reservationsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Reservation not found');
        }
    }
    async getReservationsByStatus(status) {
        return this.reservationsRepository.find({
            where: { statut: status },
            relations: ['client', 'prestataire', 'service'],
            order: { dateCreation: 'DESC' },
        });
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map