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
exports.UsersService = exports.UpdateUserDto = exports.CreateUserDto = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const auth_service_1 = require("../auth/auth.service");
class CreateUserDto {
    nom;
    prenom;
    email;
    motDePasse;
    typeUtilisateur;
    telephone;
    adresse;
}
exports.CreateUserDto = CreateUserDto;
class UpdateUserDto {
    nom;
    prenom;
    telephone;
    adresse;
    biographie;
    photoUrl;
}
exports.UpdateUserDto = UpdateUserDto;
let UsersService = class UsersService {
    usersRepository;
    authService;
    constructor(usersRepository, authService) {
        this.usersRepository = usersRepository;
        this.authService = authService;
    }
    async create(createUserDto) {
        const existingUser = await this.usersRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already registered');
        }
        const hashedPassword = await this.authService.hashPassword(createUserDto.motDePasse);
        const user = this.usersRepository.create({
            ...createUserDto,
            motDePasse: hashedPassword,
        });
        const savedUser = await this.usersRepository.save(user);
        const { motDePasse, ...result } = savedUser;
        return {
            ...result,
            sInscrire: () => true,
            sAuthentifier: () => true,
        };
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({ where: { email } });
    }
    async findById(id) {
        return this.usersRepository.findOne({
            where: { idUtilisateur: id },
            relations: ['clientProfile', 'prestaireProfile', 'adminProfile'],
        });
    }
    async update(id, updateUserDto) {
        const user = await this.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        Object.assign(user, updateUserDto);
        const updatedUser = await this.usersRepository.save(user);
        const { motDePasse, ...result } = updatedUser;
        return {
            ...result,
            sInscrire: () => true,
            sAuthentifier: () => true,
        };
    }
    async delete(id) {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('User not found');
        }
    }
    async validateCredentials(email, password) {
        const user = await this.findByEmail(email);
        if (!user) {
            return null;
        }
        const isPasswordValid = await this.authService.comparePasswords(password, user.motDePasse);
        if (!isPasswordValid) {
            return null;
        }
        return user;
    }
    async findByType(type) {
        return this.usersRepository.find({
            where: { typeUtilisateur: type, estActif: true },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map