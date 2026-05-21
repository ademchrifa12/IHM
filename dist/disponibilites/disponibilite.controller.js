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
exports.DisponibiliteController = void 0;
const common_1 = require("@nestjs/common");
const disponibilite_service_1 = require("./disponibilite.service");
const dto_1 = require("../dto");
let DisponibiliteController = class DisponibiliteController {
    disponibiliteService;
    constructor(disponibiliteService) {
        this.disponibiliteService = disponibiliteService;
    }
    create(createDisponibiliteDto) {
        return this.disponibiliteService.create(createDisponibiliteDto);
    }
    findAll(idPrestataire) {
        return this.disponibiliteService.findAll({ idPrestataire });
    }
    findByPrestataire(idPrestataire) {
        return this.disponibiliteService.findByPrestataire(idPrestataire);
    }
    findActiveForDay(idPrestataire, day) {
        return this.disponibiliteService.findActiveForDay(idPrestataire, parseInt(day));
    }
    findOne(id) {
        return this.disponibiliteService.findOne(id);
    }
    update(id, updateDisponibiliteDto) {
        return this.disponibiliteService.update(id, updateDisponibiliteDto);
    }
    remove(id) {
        return this.disponibiliteService.remove(id);
    }
    checkAvailability(body) {
        return this.disponibiliteService.isAvailable(body.idPrestataire, new Date(body.date), body.heureDebut, body.heureFin);
    }
};
exports.DisponibiliteController = DisponibiliteController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateDisponibiliteDto]),
    __metadata("design:returntype", Promise)
], DisponibiliteController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('idPrestataire')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisponibiliteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('prestataire/:idPrestataire'),
    __param(0, (0, common_1.Param)('idPrestataire')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DisponibiliteController.prototype, "findByPrestataire", null);
__decorate([
    (0, common_1.Get)('prestataire/:idPrestataire/day/:day'),
    __param(0, (0, common_1.Param)('idPrestataire')),
    __param(1, (0, common_1.Param)('day')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DisponibiliteController.prototype, "findActiveForDay", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisponibiliteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateDisponibiliteDto]),
    __metadata("design:returntype", Promise)
], DisponibiliteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisponibiliteController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('check-availability'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DisponibiliteController.prototype, "checkAvailability", null);
exports.DisponibiliteController = DisponibiliteController = __decorate([
    (0, common_1.Controller)('disponibilites'),
    __metadata("design:paramtypes", [disponibilite_service_1.DisponibiliteService])
], DisponibiliteController);
//# sourceMappingURL=disponibilite.controller.js.map