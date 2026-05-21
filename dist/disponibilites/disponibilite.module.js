"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisponibiliteModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const disponibilite_controller_1 = require("./disponibilite.controller");
const disponibilite_service_1 = require("./disponibilite.service");
const disponibilite_entity_1 = require("../entities/disponibilite.entity");
const prestataire_entity_1 = require("../entities/prestataire.entity");
let DisponibiliteModule = class DisponibiliteModule {
};
exports.DisponibiliteModule = DisponibiliteModule;
exports.DisponibiliteModule = DisponibiliteModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([disponibilite_entity_1.Disponibilite, prestataire_entity_1.Prestataire])],
        controllers: [disponibilite_controller_1.DisponibiliteController],
        providers: [disponibilite_service_1.DisponibiliteService],
        exports: [disponibilite_service_1.DisponibiliteService],
    })
], DisponibiliteModule);
//# sourceMappingURL=disponibilite.module.js.map