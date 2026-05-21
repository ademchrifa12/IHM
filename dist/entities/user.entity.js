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
exports.User = exports.UserType = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
var UserType;
(function (UserType) {
    UserType["CLIENT"] = "client";
    UserType["PRESTATAIRE"] = "prestataire";
    UserType["ADMIN"] = "admin";
})(UserType || (exports.UserType = UserType = {}));
let User = class User {
    idUtilisateur;
    nom;
    prenom;
    email;
    motDePasse;
    typeUtilisateur;
    telephone;
    adresse;
    codePostal;
    ville;
    emailVerifie;
    estActif;
    photoUrl;
    biographie;
    dateCreation;
    dateModification;
    derniereConnexion;
    clientProfile;
    prestaireProfile;
    adminProfile;
    sInscrire() {
        return true;
    }
    sAuthentifier() {
        return true;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "idUtilisateur", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "prenom", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "motDePasse", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserType,
    }),
    __metadata("design:type", String)
], User.prototype, "typeUtilisateur", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "telephone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "codePostal", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "ville", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "emailVerifie", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "estActif", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "photoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], User.prototype, "biographie", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "dateCreation", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "dateModification", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "derniereConnexion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => require('./client.entity').Client, (client) => client.user),
    __metadata("design:type", Object)
], User.prototype, "clientProfile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => require('./prestataire.entity').Prestataire, (prestataire) => prestataire.user),
    __metadata("design:type", Object)
], User.prototype, "prestaireProfile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => require('./admin.entity').Admin, (admin) => admin.user),
    __metadata("design:type", Object)
], User.prototype, "adminProfile", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users'),
    (0, typeorm_1.Index)(['email'], { unique: true }),
    (0, typeorm_1.Index)(['typeUtilisateur'])
], User);
//# sourceMappingURL=user.entity.js.map