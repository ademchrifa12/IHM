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
exports.RegionsController = void 0;
const common_1 = require("@nestjs/common");
const regions_service_1 = require("./regions.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let RegionsController = class RegionsController {
    regionsService;
    constructor(regionsService) {
        this.regionsService = regionsService;
    }
    async findAll() {
        return this.regionsService.findAll();
    }
    async findOne(id) {
        return this.regionsService.findById(id);
    }
    async create(createRegionDto) {
        if (!createRegionDto.nomRegion) {
            throw new common_1.BadRequestException('Region name is required');
        }
        return this.regionsService.create(createRegionDto);
    }
    async update(id, updateRegionDto) {
        return this.regionsService.update(id, updateRegionDto);
    }
    async delete(id) {
        await this.regionsService.delete(id);
    }
};
exports.RegionsController = RegionsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, jwt_auth_guard_1.Roles)(['admin']),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [regions_service_1.CreateRegionDto]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, jwt_auth_guard_1.Roles)(['admin']),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, regions_service_1.UpdateRegionDto]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, jwt_auth_guard_1.Roles)(['admin']),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "delete", null);
exports.RegionsController = RegionsController = __decorate([
    (0, common_1.Controller)('api/regions'),
    __metadata("design:paramtypes", [regions_service_1.RegionsService])
], RegionsController);
//# sourceMappingURL=regions.controller.js.map