import { UsersService, CreateUserDto, UpdateUserDto } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<Omit<import("../entities/user.entity").User, "motDePasse">>;
    findOne(id: string): Promise<{
        idUtilisateur: string;
        nom: string;
        prenom: string;
        email: string;
        typeUtilisateur: import("../entities/user.entity").UserType;
        telephone?: string;
        adresse?: string;
        codePostal?: string;
        ville?: string;
        emailVerifie: boolean;
        estActif: boolean;
        photoUrl?: string;
        biographie?: string;
        dateCreation: Date;
        dateModification: Date;
        derniereConnexion?: Date;
        clientProfile?: any;
        prestaireProfile?: any;
        adminProfile?: any;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<import("../entities/user.entity").User, "motDePasse">>;
    delete(id: string): Promise<void>;
    findByType(type: string): Promise<import("../entities/user.entity").User[]>;
}
