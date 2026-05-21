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
exports.RegionsService = exports.UpdateRegionDto = exports.CreateRegionDto = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const region_entity_1 = require("../entities/region.entity");
class CreateRegionDto {
    nomRegion;
}
exports.CreateRegionDto = CreateRegionDto;
class UpdateRegionDto {
    nomRegion;
    estActive;
}
exports.UpdateRegionDto = UpdateRegionDto;
let RegionsService = class RegionsService {
    regionsRepository;
    constructor(regionsRepository) {
        this.regionsRepository = regionsRepository;
    }
    async create(createRegionDto) {
        if (!createRegionDto.nomRegion) {
            throw new common_1.BadRequestException('Region name is required');
        }
        const existingRegion = await this.regionsRepository.findOne({
            where: { nomRegion: createRegionDto.nomRegion },
        });
        if (existingRegion) {
            throw new common_1.ConflictException('Region already exists');
        }
        const region = this.regionsRepository.create(createRegionDto);
        return this.regionsRepository.save(region);
    }
    async findAll() {
        return this.regionsRepository.find({
            where: { estActive: true },
            relations: ['services'],
            order: { nomRegion: 'ASC' },
        });
    }
    async findById(id) {
        const region = await this.regionsRepository.findOne({
            where: { idRegion: id },
            relations: ['services'],
        });
        if (!region) {
            throw new common_1.NotFoundException('Region not found');
        }
        return region;
    }
    async update(id, updateRegionDto) {
        const region = await this.findById(id);
        Object.assign(region, updateRegionDto);
        return this.regionsRepository.save(region);
    }
    async delete(id) {
        const result = await this.regionsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Region not found');
        }
    }
};
exports.RegionsService = RegionsService;
exports.RegionsService = RegionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(region_entity_1.Region)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RegionsService);
//# sourceMappingURL=regions.service.js.map