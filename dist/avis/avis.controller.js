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
exports.AvisController = void 0;
const common_1 = require("@nestjs/common");
const avis_service_1 = require("./avis.service");
const dto_1 = require("../dto");
const avis_entity_1 = require("../entities/avis.entity");
let AvisController = class AvisController {
    avisService;
    constructor(avisService) {
        this.avisService = avisService;
    }
    create(createAvisDto) {
        return this.avisService.create(createAvisDto);
    }
    findAll(idReservation, typeAvis) {
        return this.avisService.findAll({
            idReservation,
            typeAvis,
        });
    }
    findCommentaires(idReservation) {
        return this.avisService.findCommentaires(idReservation);
    }
    findNotes(idReservation) {
        return this.avisService.findNotes(idReservation);
    }
    findByReservation(idReservation) {
        return this.avisService.findByReservation(idReservation);
    }
    getAverageNote(idReservation) {
        return this.avisService.getAverageNote(idReservation);
    }
    findOne(id) {
        return this.avisService.findOne(id);
    }
    update(id, updateAvisDto) {
        return this.avisService.update(id, updateAvisDto);
    }
    remove(id) {
        return this.avisService.remove(id);
    }
    reportAvis(id) {
        return this.avisService.reportAvis(id);
    }
    toggleVisibility(id) {
        return this.avisService.toggleVisibility(id);
    }
};
exports.AvisController = AvisController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAvisDto]),
    __metadata("design:returntype", Promise)
], AvisController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('idReservation')),
    __param(1, (0, common_1.Query)('typeAvis')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AvisController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('commentaires'),
    __param(0, (0, common_1.Query)('idReservation')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AvisController.prototype, "findCommentaires", null);
__decorate([
    (0, common_1.Get)('notes'),
    __param(0, (0, common_1.Query)('idReservation')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AvisController.prototype, "findNotes", null);
__decorate([
    (0, common_1.Get)('reservation/:idReservation'),
    __param(0, (0, common_1.Param)('idReservation')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AvisController.prototype, "findByReservation", null);
__decorate([
    (0, common_1.Get)('reservation/:idReservation/moyenne'),
    __param(0, (0, common_1.Param)('idReservation')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AvisController.prototype, "getAverageNote", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AvisController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateAvisDto]),
    __metadata("design:returntype", Promise)
], AvisController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AvisController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/report'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AvisController.prototype, "reportAvis", null);
__decorate([
    (0, common_1.Patch)(':id/visibility'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AvisController.prototype, "toggleVisibility", null);
exports.AvisController = AvisController = __decorate([
    (0, common_1.Controller)('avis'),
    __metadata("design:paramtypes", [avis_service_1.AvisService])
], AvisController);
//# sourceMappingURL=avis.controller.js.map