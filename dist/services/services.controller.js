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
exports.ServicesController = void 0;
const common_1 = require("@nestjs/common");
const services_service_1 = require("./services.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ServicesController = class ServicesController {
    servicesService;
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    async findAll(limit = '10', offset = '0') {
        return this.servicesService.findAll(parseInt(limit), parseInt(offset));
    }
    async search(query, categorieId, regionId, limit = '10', offset = '0') {
        if (!query) {
            throw new common_1.BadRequestException('Search query is required');
        }
        return this.servicesService.search(query, categorieId, regionId, parseInt(limit), parseInt(offset));
    }
    async findOne(id) {
        return this.servicesService.findById(id);
    }
    async create(createServiceDto) {
        if (!createServiceDto.titre || !createServiceDto.description) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        return this.servicesService.create(createServiceDto);
    }
    async update(id, updateServiceDto) {
        return this.servicesService.update(id, updateServiceDto);
    }
    async delete(id) {
        await this.servicesService.delete(id);
    }
    async findByPrestataire(idPrestataire) {
        return this.servicesService.findByPrestataire(idPrestataire);
    }
    async addCategory(id, categoryId) {
        return this.servicesService.addCategory(id, categoryId);
    }
    async addRegion(id, regionId) {
        return this.servicesService.addRegion(id, regionId);
    }
};
exports.ServicesController = ServicesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('categorie')),
    __param(2, (0, common_1.Query)('region')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, jwt_auth_guard_1.Roles)(['prestataire']),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [services_service_1.CreateServiceDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, jwt_auth_guard_1.Roles)(['prestataire']),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, services_service_1.UpdateServiceDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, jwt_auth_guard_1.Roles)(['prestataire', 'admin']),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('prestataire/:idPrestataire'),
    __param(0, (0, common_1.Param)('idPrestataire')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findByPrestataire", null);
__decorate([
    (0, common_1.Post)(':id/categories/:categoryId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, jwt_auth_guard_1.Roles)(['prestataire']),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "addCategory", null);
__decorate([
    (0, common_1.Post)(':id/regions/:regionId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, jwt_auth_guard_1.Roles)(['prestataire']),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('regionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "addRegion", null);
exports.ServicesController = ServicesController = __decorate([
    (0, common_1.Controller)('api/services'),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServicesController);
//# sourceMappingURL=services.controller.js.map