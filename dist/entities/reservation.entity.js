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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = exports.ReservationStatus = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("./client.entity");
const prestataire_entity_1 = require("./prestataire.entity");
const service_entity_1 = require("./service.entity");
const disponibilite_entity_1 = require("./disponibilite.entity");
const avis_entity_1 = require("./avis.entity");
var ReservationStatus;
(function (ReservationStatus) {
    ReservationStatus["PENDING"] = "pending";
    ReservationStatus["ACCEPTED"] = "accepted";
    ReservationStatus["REJECTED"] = "rejected";
    ReservationStatus["COMPLETED"] = "completed";
    ReservationStatus["CANCELLED"] = "cancelled";
})(ReservationStatus || (exports.ReservationStatus = ReservationStatus = {}));
let Reservation = class Reservation {
    idReservation;
    statut;
    dateReservation;
    dateExecution;
    prix;
    notes;
    dateCreation;
    dateModification;
    client;
    idClient;
    prestataire;
    idPrestataire;
    service;
    idService;
    disponibilite;
    idDisponibilite;
    avis;
    peutAvoirAvis() {
        return this.statut === ReservationStatus.COMPLETED;
    }
    ajouterAvis(avis) {
        if (!this.avis) {
            this.avis = [];
        }
        this.avis.push(avis);
    }
};
exports.Reservation = Reservation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Reservation.prototype, "idReservation", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ReservationStatus,
        default: ReservationStatus.PENDING,
    }),
    __metadata("design:type", String)
], Reservation.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Reservation.prototype, "dateReservation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Reservation.prototype, "dateExecution", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Reservation.prototype, "prix", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Reservation.prototype, "dateCreation", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Reservation.prototype, "dateModification", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, (client) => client.reservations, {
        onDelete: 'CASCADE',
        eager: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'idClient' }),
    __metadata("design:type", client_entity_1.Client)
], Reservation.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reservation.prototype, "idClient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => prestataire_entity_1.Prestataire, (prestataire) => prestataire.reservations, {
        onDelete: 'CASCADE',
        eager: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'idPrestataire' }),
    __metadata("design:type", prestataire_entity_1.Prestataire)
], Reservation.prototype, "prestataire", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reservation.prototype, "idPrestataire", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service, (service) => service.reservations, {
        onDelete: 'CASCADE',
        eager: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'idService' }),
    __metadata("design:type", service_entity_1.Service)
], Reservation.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reservation.prototype, "idService", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => disponibilite_entity_1.Disponibilite, {
        nullable: true,
        onDelete: 'SET NULL',
        eager: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'idDisponibilite' }),
    __metadata("design:type", disponibilite_entity_1.Disponibilite)
], Reservation.prototype, "disponibilite", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "idDisponibilite", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => avis_entity_1.Avis, (avis) => avis.reservation, {
        cascade: true,
        onDelete: 'CASCADE',
        eager: false,
    }),
    __metadata("design:type", Array)
], Reservation.prototype, "avis", void 0);
exports.Reservation = Reservation = __decorate([
    (0, typeorm_1.Entity)('reservations'),
    (0, typeorm_1.Index)(['idClient']),
    (0, typeorm_1.Index)(['idPrestataire']),
    (0, typeorm_1.Index)(['statut']),
    (0, typeorm_1.Index)(['dateReservation'])
], Reservation);
//# sourceMappingURL=reservation.entity.js.map