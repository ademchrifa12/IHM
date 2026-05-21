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
exports.Service = void 0;
const typeorm_1 = require("typeorm");
const prestataire_entity_1 = require("./prestataire.entity");
const region_entity_1 = require("./region.entity");
const reservation_entity_1 = require("./reservation.entity");
const service_categorie_entity_1 = require("./service-categorie.entity");
let Service = class Service {
    idService;
    titre;
    description;
    prix;
    experienceRequise;
    estValide;
    dateCreation;
    dateModification;
    imageUrl;
    nombreCommandes;
    tauxSatisfaction;
    prestataire;
    idPrestataire;
    serviceCategories;
    regions;
    reservations;
    fiches;
    calculDispo() {
        return this.estValide && (this.prestataire?.disponibilites?.length ?? 0) > 0;
    }
    reserver(dateReservation) {
        return null;
    }
};
exports.Service = Service;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Service.prototype, "idService", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Service.prototype, "titre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Service.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Service.prototype, "prix", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Service.prototype, "experienceRequise", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Service.prototype, "estValide", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Service.prototype, "dateCreation", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Service.prototype, "dateModification", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Service.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Service.prototype, "nombreCommandes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Service.prototype, "tauxSatisfaction", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => prestataire_entity_1.Prestataire, (prestataire) => prestataire.services, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", prestataire_entity_1.Prestataire)
], Service.prototype, "prestataire", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Service.prototype, "idPrestataire", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_categorie_entity_1.ServiceCategorie, (serviceCategorie) => serviceCategorie.service, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Service.prototype, "serviceCategories", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => region_entity_1.Region, (region) => region.services),
    (0, typeorm_1.JoinTable)({
        name: 'service_region',
        joinColumn: { name: 'idService', referencedColumnName: 'idService' },
        inverseJoinColumn: { name: 'idRegion', referencedColumnName: 'idRegion' },
    }),
    __metadata("design:type", Array)
], Service.prototype, "regions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_entity_1.Reservation, (reservation) => reservation.service, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Service.prototype, "reservations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => require('./fiche-service.entity').FicheService, (fiche) => fiche.service, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Service.prototype, "fiches", void 0);
exports.Service = Service = __decorate([
    (0, typeorm_1.Entity)('services'),
    (0, typeorm_1.Index)(['idPrestataire']),
    (0, typeorm_1.Index)(['estValide'])
], Service);
//# sourceMappingURL=service.entity.js.map