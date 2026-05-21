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
exports.Disponibilite = void 0;
const typeorm_1 = require("typeorm");
const prestataire_entity_1 = require("./prestataire.entity");
let Disponibilite = class Disponibilite {
    idDisponibilite;
    joursDisponibles;
    heureDebut;
    heureFin;
    estActive;
    notes;
    dateCreation;
    dateModification;
    prestataire;
    idPrestataire;
};
exports.Disponibilite = Disponibilite;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Disponibilite.prototype, "idDisponibilite", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-array',
        comment: 'Jours disponibles (0=Lundi, 1=Mardi, ... 6=Dimanche)',
    }),
    __metadata("design:type", Array)
], Disponibilite.prototype, "joursDisponibles", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Disponibilite.prototype, "heureDebut", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Disponibilite.prototype, "heureFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Disponibilite.prototype, "estActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Disponibilite.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Disponibilite.prototype, "dateCreation", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Disponibilite.prototype, "dateModification", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => prestataire_entity_1.Prestataire, (prestataire) => prestataire.disponibilites, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'idPrestataire' }),
    __metadata("design:type", prestataire_entity_1.Prestataire)
], Disponibilite.prototype, "prestataire", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Disponibilite.prototype, "idPrestataire", void 0);
exports.Disponibilite = Disponibilite = __decorate([
    (0, typeorm_1.Entity)('disponibilites'),
    (0, typeorm_1.Index)(['idPrestataire']),
    (0, typeorm_1.Index)(['idPrestataire', 'joursDisponibles'])
], Disponibilite);
//# sourceMappingURL=disponibilite.entity.js.map