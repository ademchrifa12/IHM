import { Repository } from 'typeorm';
import { User, UserType } from '../entities/user.entity';
import { AuthService } from '../auth/auth.service';
export declare class CreateUserDto {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    typeUtilisateur: UserType;
    telephone?: string;
    adresse?: string;
}
export declare class UpdateUserDto {
    nom?: string;
    prenom?: string;
    telephone?: string;
    adresse?: string;
    biographie?: string;
    photoUrl?: string;
}
export declare class UsersService {
    private usersRepository;
    private authService;
    constructor(usersRepository: Repository<User>, authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<Omit<User, 'motDePasse'>>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<User, 'motDePasse'>>;
    delete(id: string): Promise<void>;
    validateCredentials(email: string, password: string): Promise<User | null>;
    findByType(type: UserType): Promise<User[]>;
}
