"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategorieModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const service_categorie_controller_1 = require("./service-categorie.controller");
const service_categorie_service_1 = require("./service-categorie.service");
const service_categorie_entity_1 = require("../entities/service-categorie.entity");
const service_entity_1 = require("../entities/service.entity");
const categorie_entity_1 = require("../entities/categorie.entity");
let ServiceCategorieModule = class ServiceCategorieModule {
};
exports.ServiceCategorieModule = ServiceCategorieModule;
exports.ServiceCategorieModule = ServiceCategorieModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([service_categorie_entity_1.ServiceCategorie, service_entity_1.Service, categorie_entity_1.Categorie])],
        controllers: [service_categorie_controller_1.ServiceCategorieController],
        providers: [service_categorie_service_1.ServiceCategorieService],
        exports: [service_categorie_service_1.ServiceCategorieService],
    })
], ServiceCategorieModule);
//# sourceMappingURL=service-categorie.module.js.map