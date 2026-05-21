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
exports.FicheService = void 0;
const typeorm_1 = require("typeorm");
const service_entity_1 = require("./service.entity");
let FicheService = class FicheService {
    idFiche;
    titre;
    prix;
    categorieId;
    regionId;
    experienceRequise;
    dateCreation;
    dateModification;
    imageUrl;
    service;
    idService;
};
exports.FicheService = FicheService;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FicheService.prototype, "idFiche", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FicheService.prototype, "titre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], FicheService.prototype, "prix", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], FicheService.prototype, "categorieId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], FicheService.prototype, "regionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], FicheService.prototype, "experienceRequise", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FicheService.prototype, "dateCreation", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], FicheService.prototype, "dateModification", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FicheService.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service, (service) => service.fiches, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", service_entity_1.Service)
], FicheService.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FicheService.prototype, "idService", void 0);
exports.FicheService = FicheService = __decorate([
    (0, typeorm_1.Entity)('fiches_services')
], FicheService);
//# sourceMappingURL=fiche-service.entity.js.map