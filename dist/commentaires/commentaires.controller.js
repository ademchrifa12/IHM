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
exports.CommentairesController = void 0;
const common_1 = require("@nestjs/common");
const commentaires_service_1 = require("./commentaires.service");
const dto_1 = require("../dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let CommentairesController = class CommentairesController {
    commentairesService;
    constructor(commentairesService) {
        this.commentairesService = commentairesService;
    }
    async findAll(limit = '10', offset = '0') {
        return this.commentairesService.findAll(parseInt(limit), parseInt(offset));
    }
    async findOne(id) {
        return this.commentairesService.findById(id);
    }
    async create(createCommentaireDto) {
        if (!createCommentaireDto.note || !createCommentaireDto.contenu) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        return this.commentairesService.create(createCommentaireDto);
    }
    async update(id, updateCommentaireDto) {
        return this.commentairesService.update(id, updateCommentaireDto);
    }
    async delete(id) {
        await this.commentairesService.delete(id);
    }
    async findByService(idService) {
        return this.commentairesService.findByService(idService);
    }
    async getServiceRating(idService) {
        return this.commentairesService.getServiceRating(idService);
    }
    async findByClient(idClient) {
        return this.commentairesService.findByClient(idClient);
    }
    async toggleVisibility(id, body) {
        if (body.visible === undefined) {
            throw new common_1.BadRequestException('Visibility status is required');
        }
        return this.commentairesService.toggleVisibility(id, body.visible);
    }
    async reportComment(id) {
        return this.commentairesService.reportComment(id);
    }
};
exports.CommentairesController = CommentairesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CommentairesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentairesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, jwt_auth_guard_1.Roles)(['client']),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCommentaireDto]),
    __metadata("design:returntype", Promise)
], CommentairesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, jwt_auth_guard_1.Roles)(['client']),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCommentaireDto]),
    __metadata("design:returntype", Promise)
], CommentairesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, jwt_auth_guard_1.Roles)(['client', 'admin']),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentairesController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('service/:idService'),
    __param(0, (0, common_1.Param)('idService')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentairesController.prototype, "findByService", null);
__decorate([
    (0, common_1.Get)('service/:idService/rating'),
    __param(0, (0, common_1.Param)('idService')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentairesController.prototype, "getServiceRating", null);
__decorate([
    (0, common_1.Get)('client/:idClient'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('idClient')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentairesController.prototype, "findByClient", null);
__decorate([
    (0, common_1.Patch)(':id/visibility'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, jwt_auth_guard_1.Roles)(['admin']),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentairesController.prototype, "toggleVisibility", null);
__decorate([
    (0, common_1.Post)(':id/report'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentairesController.prototype, "reportComment", null);
exports.CommentairesController = CommentairesController = __decorate([
    (0, common_1.Controller)('api/commentaires'),
    __metadata("design:paramtypes", [commentaires_service_1.CommentairesService])
], CommentairesController);
//# sourceMappingURL=commentaires.controller.js.map