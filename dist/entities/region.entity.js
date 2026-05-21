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
exports.Region = void 0;
const typeorm_1 = require("typeorm");
const service_entity_1 = require("./service.entity");
let Region = class Region {
    idRegion;
    nomRegion;
    estActive;
    services;
};
exports.Region = Region;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Region.prototype, "idRegion", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Region.prototype, "nomRegion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Region.prototype, "estActive", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => service_entity_1.Service, (service) => service.regions, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Region.prototype, "services", void 0);
exports.Region = Region = __decorate([
    (0, typeorm_1.Entity)('regions'),
    (0, typeorm_1.Index)(['nomRegion'], { unique: true })
], Region);
//# sourceMappingURL=region.entity.js.map