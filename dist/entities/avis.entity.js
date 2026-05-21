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
exports.Avis = exports.AvisType = void 0;
const typeorm_1 = require("typeorm");
const reservation_entity_1 = require("./reservation.entity");
var AvisType;
(function (AvisType) {
    AvisType["COMMENTAIRE"] = "commentaire";
    AvisType["NOTE"] = "note";
})(AvisType || (exports.AvisType = AvisType = {}));
let Avis = class Avis {
    idAvis;
    note;
    contenu;
    typeAvis;
    dateCreation;
    dateModification;
    estVisible;
    nombreSignalement;
    reservation;
    idReservation;
};
exports.Avis = Avis;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Avis.prototype, "idAvis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Avis.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Avis.prototype, "contenu", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AvisType,
        default: AvisType.COMMENTAIRE,
    }),
    __metadata("design:type", String)
], Avis.prototype, "typeAvis", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Avis.prototype, "dateCreation", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Avis.prototype, "dateModification", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Avis.prototype, "estVisible", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Avis.prototype, "nombreSignalement", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reservation_entity_1.Reservation, (reservation) => reservation.avis, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", reservation_entity_1.Reservation)
], Avis.prototype, "reservation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Avis.prototype, "idReservation", void 0);
exports.Avis = Avis = __decorate([
    (0, typeorm_1.Entity)('avis'),
    (0, typeorm_1.Index)(['typeAvis']),
    (0, typeorm_1.Index)(['idReservation']),
    (0, typeorm_1.Index)(['dateCreation']),
    (0, typeorm_1.TableInheritance)({ column: { type: 'varchar', name: 'typeAvis' } })
], Avis);
//# sourceMappingURL=avis.entity.js.map