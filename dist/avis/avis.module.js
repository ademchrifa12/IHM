"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvisModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const avis_controller_1 = require("./avis.controller");
const avis_service_1 = require("./avis.service");
const avis_entity_1 = require("../entities/avis.entity");
const commentaire_entity_1 = require("../entities/commentaire.entity");
const note_entity_1 = require("../entities/note.entity");
const reservation_entity_1 = require("../entities/reservation.entity");
let AvisModule = class AvisModule {
};
exports.AvisModule = AvisModule;
exports.AvisModule = AvisModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([avis_entity_1.Avis, commentaire_entity_1.Commentaire, note_entity_1.Note, reservation_entity_1.Reservation])],
        controllers: [avis_controller_1.AvisController],
        providers: [avis_service_1.AvisService],
        exports: [avis_service_1.AvisService],
    })
], AvisModule);
//# sourceMappingURL=avis.module.js.map