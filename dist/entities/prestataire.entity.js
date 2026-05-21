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
exports.Prestataire = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const reservation_entity_1 = require("./reservation.entity");
const service_entity_1 = require("./service.entity");
const disponibilite_entity_1 = require("./disponibilite.entity");
let Prestataire = class Prestataire {
    idPrestataire;
    user;
    idUtilisateur;
    evaluationMoy;
    nombreAvis;
    experience;
    estVerifie;
    certificationsUrl;
    disponibleDef;
    dateInscription;
    services;
    reservations;
    disponibilites;
    definirDisponibilite(disponibilites) {
        this.disponibilites = disponibilites;
    }
    estDisponible(date) {
        if (!this.disponibilites || this.disponibilites.length === 0) {
            return false;
        }
        const jour = date.getDay();
        const heure = date.getHours();
        const minute = date.getMinutes();
        return this.disponibilites.some((dispo) => {
            if (!dispo.joursDisponibles.includes(jour))
                return false;
            const [heureDebut, minDebut] = dispo.heureDebut.split(':').map(Number);
            const [heureFin, minFin] = dispo.heureFin.split(':').map(Number);
            const timeMinutes = heure * 60 + minute;
            const startMinutes = heureDebut * 60 + minDebut;
            const endMinutes = heureFin * 60 + minFin;
            return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
        });
    }
    proposerService(service) {
    }
    gererProfil() {
    }
    gererService() {
    }
};
exports.Prestataire = Prestataire;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Prestataire.prototype, "idPrestataire", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.prestaireProfile, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'idUtilisateur' }),
    __metadata("design:type", user_entity_1.User)
], Prestataire.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Prestataire.prototype, "idUtilisateur", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Prestataire.prototype, "evaluationMoy", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Prestataire.prototype, "nombreAvis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Prestataire.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Prestataire.prototype, "estVerifie", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Prestataire.prototype, "certificationsUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Prestataire.prototype, "disponibleDef", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Prestataire.prototype, "dateInscription", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_entity_1.Service, (service) => service.prestataire, {
        onDelete: 'CASCADE',
        eager: false,
    }),
    __metadata("design:type", Array)
], Prestataire.prototype, "services", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_entity_1.Reservation, (reservation) => reservation.prestataire, {
        onDelete: 'CASCADE',
        eager: false,
    }),
    __metadata("design:type", Array)
], Prestataire.prototype, "reservations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => disponibilite_entity_1.Disponibilite, (disponibilite) => disponibilite.prestataire, {
        cascade: true,
        onDelete: 'CASCADE',
        eager: false,
    }),
    __metadata("design:type", Array)
], Prestataire.prototype, "disponibilites", void 0);
exports.Prestataire = Prestataire = __decorate([
    (0, typeorm_1.Entity)('prestataires'),
    (0, typeorm_1.Index)(['estVerifie'])
], Prestataire);
//# sourceMappingURL=prestataire.entity.js.map