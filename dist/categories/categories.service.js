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
exports.CategoriesService = exports.UpdateCategorieDto = exports.CreateCategorieDto = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const categorie_entity_1 = require("../entities/categorie.entity");
class CreateCategorieDto {
    nom;
    description;
    iconUrl;
}
exports.CreateCategorieDto = CreateCategorieDto;
class UpdateCategorieDto {
    nom;
    description;
    iconUrl;
    estActive;
}
exports.UpdateCategorieDto = UpdateCategorieDto;
let CategoriesService = class CategoriesService {
    categoriesRepository;
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async create(createCategorieDto) {
        if (!createCategorieDto.nom) {
            throw new common_1.BadRequestException('Category name is required');
        }
        const existingCategory = await this.categoriesRepository.findOne({
            where: { nom: createCategorieDto.nom },
        });
        if (existingCategory) {
            throw new common_1.ConflictException('Category already exists');
        }
        const categorie = this.categoriesRepository.create(createCategorieDto);
        return this.categoriesRepository.save(categorie);
    }
    async findAll() {
        return this.categoriesRepository.find({
            where: { estActive: true },
            relations: ['services'],
            order: { nom: 'ASC' },
        });
    }
    async findById(id) {
        const categorie = await this.categoriesRepository.findOne({
            where: { idCategorie: id },
            relations: ['services'],
        });
        if (!categorie) {
            throw new common_1.NotFoundException('Category not found');
        }
        return categorie;
    }
    async update(id, updateCategorieDto) {
        const categorie = await this.findById(id);
        Object.assign(categorie, updateCategorieDto);
        return this.categoriesRepository.save(categorie);
    }
    async delete(id) {
        const result = await this.categoriesRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Category not found');
        }
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categorie_entity_1.Categorie)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map