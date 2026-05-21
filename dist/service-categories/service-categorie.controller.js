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
exports.ServiceCategorieController = void 0;
const common_1 = require("@nestjs/common");
const service_categorie_service_1 = require("./service-categorie.service");
const dto_1 = require("../dto");
let ServiceCategorieController = class ServiceCategorieController {
    serviceCategorieService;
    constructor(serviceCategorieService) {
        this.serviceCategorieService = serviceCategorieService;
    }
    create(createServiceCategorieDto) {
        return this.serviceCategorieService.create(createServiceCategorieDto);
    }
    findAll(idService, idCategorie) {
        return this.serviceCategorieService.findAll({
            idService,
            idCategorie,
        });
    }
    findByService(idService) {
        return this.serviceCategorieService.findByService(idService);
    }
    findByCategorie(idCategorie) {
        return this.serviceCategorieService.findByCategorie(idCategorie);
    }
    countServicesByCategorie(idCategorie) {
        return this.serviceCategorieService.countServicesByCategorie(idCategorie);
    }
    findOne(id) {
        return this.serviceCategorieService.findOne(id);
    }
    update(id, updateServiceCategorieDto) {
        return this.serviceCategorieService.update(id, updateServiceCategorieDto);
    }
    remove(id) {
        return this.serviceCategorieService.remove(id);
    }
    addCategorieToService(idService, idCategorie, nom) {
        return this.serviceCategorieService.addCategorieToService(idService, idCategorie, nom);
    }
    removeCategorieFromService(idService, idCategorie) {
        return this.serviceCategorieService.removeCategorieFromService(idService, idCategorie);
    }
};
exports.ServiceCategorieController = ServiceCategorieController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateServiceCategorieDto]),
    __metadata("design:returntype", Promise)
], ServiceCategorieController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('idService')),
    __param(1, (0, common_1.Query)('idCategorie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ServiceCategorieController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('service/:idService'),
    __param(0, (0, common_1.Param)('idService')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceCategorieController.prototype, "findByService", null);
__decorate([
    (0, common_1.Get)('categorie/:idCategorie'),
    __param(0, (0, common_1.Param)('idCategorie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceCategorieController.prototype, "findByCategorie", null);
__decorate([
    (0, common_1.Get)('categorie/:idCategorie/count'),
    __param(0, (0, common_1.Param)('idCategorie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceCategorieController.prototype, "countServicesByCategorie", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceCategorieController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateServiceCategorieDto]),
    __metadata("design:returntype", Promise)
], ServiceCategorieController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceCategorieController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':idService/add-categorie/:idCategorie'),
    __param(0, (0, common_1.Param)('idService')),
    __param(1, (0, common_1.Param)('idCategorie')),
    __param(2, (0, common_1.Body)('nom')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ServiceCategorieController.prototype, "addCategorieToService", null);
__decorate([
    (0, common_1.Delete)(':idService/remove-categorie/:idCategorie'),
    __param(0, (0, common_1.Param)('idService')),
    __param(1, (0, common_1.Param)('idCategorie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ServiceCategorieController.prototype, "removeCategorieFromService", null);
exports.ServiceCategorieController = ServiceCategorieController = __decorate([
    (0, common_1.Controller)('service-categories'),
    __metadata("design:paramtypes", [service_categorie_service_1.ServiceCategorieService])
], ServiceCategorieController);
//# sourceMappingURL=service-categorie.controller.js.map