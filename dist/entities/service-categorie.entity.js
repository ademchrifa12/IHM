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
exports.ServiceCategorie = void 0;
const typeorm_1 = require("typeorm");
const service_entity_1 = require("./service.entity");
const categorie_entity_1 = require("./categorie.entity");
let ServiceCategorie = class ServiceCategorie {
    idServiceCategorie;
    nom;
    description;
    dateCreation;
    categorie;
    idCategorie;
    service;
    idService;
};
exports.ServiceCategorie = ServiceCategorie;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ServiceCategorie.prototype, "idServiceCategorie", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceCategorie.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ServiceCategorie.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ServiceCategorie.prototype, "dateCreation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categorie_entity_1.Categorie, (categorie) => categorie.serviceCategories, {
        onDelete: 'CASCADE',
        eager: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'idCategorie' }),
    __metadata("design:type", categorie_entity_1.Categorie)
], ServiceCategorie.prototype, "categorie", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceCategorie.prototype, "idCategorie", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service, (service) => service.serviceCategories, {
        onDelete: 'CASCADE',
        eager: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'idService' }),
    __metadata("design:type", service_entity_1.Service)
], ServiceCategorie.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceCategorie.prototype, "idService", void 0);
exports.ServiceCategorie = ServiceCategorie = __decorate([
    (0, typeorm_1.Entity)('service_categories'),
    (0, typeorm_1.Index)(['idCategorie']),
    (0, typeorm_1.Index)(['idService']),
    (0, typeorm_1.Index)(['idCategorie', 'idService'], { unique: true })
], ServiceCategorie);
//# sourceMappingURL=service-categorie.entity.js.map