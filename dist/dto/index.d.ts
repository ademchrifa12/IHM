import { UserType } from '../entities/user.entity';
import { AvisType } from '../entities/avis.entity';
import { ReservationStatus } from '../entities/reservation.entity';
export declare class RegisterDto {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    typeUtilisateur: UserType;
    telephone?: string;
}
export declare class LoginDto {
    email: string;
    motDePasse: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
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
export declare class CreateServiceDto {
    titre: string;
    description: string;
    prix: number;
    experienceRequise: string;
    imageUrl?: string;
    idPrestataire: string;
}
export declare class UpdateServiceDto {
    titre?: string;
    description?: string;
    prix?: number;
    experienceRequise?: string;
    imageUrl?: string;
}
export declare class CreateReservationDto {
    dateReservation: Date;
    dateExecution?: Date;
    idService: string;
    idClient: string;
    idPrestataire: string;
    idDisponibilite?: string;
    notes?: string;
}
export declare class UpdateReservationStatusDto {
    status: ReservationStatus;
}
export declare class CreateAvisDto {
    note: number;
    contenu?: string;
    idReservation: string;
    typeAvis: AvisType;
}
export declare class UpdateAvisDto {
    note?: number;
    contenu?: string;
}
export declare class CreateCommentaireDto extends CreateAvisDto {
    constructor();
}
export declare class UpdateCommentaireDto extends UpdateAvisDto {
}
export declare class CreateNoteDto extends CreateAvisDto {
    constructor();
}
export declare class UpdateNoteDto extends UpdateAvisDto {
}
export declare class CreateServiceCategorieDto {
    nom: string;
    description?: string;
    idCategorie: string;
    idService: string;
}
export declare class UpdateServiceCategorieDto {
    nom?: string;
    description?: string;
}
export declare class CreateDisponibiliteDto {
    joursDisponibles: number[];
    heureDebut: string;
    heureFin: string;
    idPrestataire: string;
    notes?: string;
}
export declare class UpdateDisponibiliteDto {
    joursDisponibles?: number[];
    heureDebut?: string;
    heureFin?: string;
    estActive?: boolean;
    notes?: string;
}
export declare class CreateCategorieDto {
    nom: string;
    description?: string;
    iconUrl?: string;
}
export declare class UpdateCategorieDto {
    nom?: string;
    description?: string;
    iconUrl?: string;
    estActive?: boolean;
}
export declare class CreateRegionDto {
    nomRegion: string;
}
export declare class UpdateRegionDto {
    nomRegion?: string;
    estActive?: boolean;
}
export declare class PaginationQueryDto {
    limit?: number;
    offset?: number;
}
