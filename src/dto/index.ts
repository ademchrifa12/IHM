import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsNumber,
  Min,
  Max,
  IsArray,
  IsDateString,
} from 'class-validator';
import { UserType } from '../entities/user.entity';
import { AvisType } from '../entities/avis.entity';
import { ReservationStatus } from '../entities/reservation.entity';

/**
 * Authentication DTOs
 */
export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  nom: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  prenom: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  motDePasse: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  typeUtilisateur: UserType;

  @IsOptional()
  @IsPhoneNumber('FR')
  telephone?: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  motDePasse: string;
}

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

/**
 * User DTOs
 */
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  prenom: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  motDePasse: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  typeUtilisateur: UserType;

  @IsOptional()
  @IsPhoneNumber('FR')
  telephone?: string;

  @IsOptional()
  @IsString()
  adresse?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  prenom?: string;

  @IsOptional()
  @IsPhoneNumber('FR')
  telephone?: string;

  @IsOptional()
  @IsString()
  adresse?: string;

  @IsOptional()
  @IsString()
  biographie?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}

/**
 * Service DTOs
 */
export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  titre: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  prix: number;

  @IsNotEmpty()
  @IsString()
  experienceRequise: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsNotEmpty()
  @IsString()
  idPrestataire: string;
}

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  titre?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  prix?: number;

  @IsOptional()
  @IsString()
  experienceRequise?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}

/**
 * Reservation DTOs
 */
export class CreateReservationDto {
  @IsNotEmpty()
  @IsDateString()
  dateReservation: Date;

  @IsOptional()
  @IsDateString()
  dateExecution?: Date;

  @IsNotEmpty()
  @IsString()
  idService: string;

  @IsNotEmpty()
  @IsString()
  idClient: string;

  @IsNotEmpty()
  @IsString()
  idPrestataire: string;

  @IsOptional()
  @IsString()
  idDisponibilite?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateReservationStatusDto {
  @IsNotEmpty()
  @IsEnum(ReservationStatus)
  status: ReservationStatus;
}

/**
 * Avis DTOs (Commentaire et Note)
 */
export class CreateAvisDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  note: number;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  contenu?: string;

  @IsNotEmpty()
  @IsString()
  idReservation: string;

  @IsNotEmpty()
  @IsEnum(AvisType)
  typeAvis: AvisType;
}

export class UpdateAvisDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  note?: number;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  contenu?: string;
}

/**
 * Commentaire DTOs (hérité de Avis)
 */
export class CreateCommentaireDto extends CreateAvisDto {
  constructor() {
    super();
    this.typeAvis = AvisType.COMMENTAIRE;
  }
}

export class UpdateCommentaireDto extends UpdateAvisDto {}

/**
 * Note DTOs (hérité de Avis)
 */
export class CreateNoteDto extends CreateAvisDto {
  constructor() {
    super();
    this.typeAvis = AvisType.NOTE;
  }
}

export class UpdateNoteDto extends UpdateAvisDto {}

/**
 * ServiceCategorie DTOs
 */
export class CreateServiceCategorieDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  nom: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  idCategorie: string;

  @IsNotEmpty()
  @IsString()
  idService: string;
}

export class UpdateServiceCategorieDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

/**
 * Disponibilité DTOs
 */
export class CreateDisponibiliteDto {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  joursDisponibles: number[];

  @IsNotEmpty()
  @IsString()
  heureDebut: string;

  @IsNotEmpty()
  @IsString()
  heureFin: string;

  @IsNotEmpty()
  @IsString()
  idPrestataire: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateDisponibiliteDto {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  joursDisponibles?: number[];

  @IsOptional()
  @IsString()
  heureDebut?: string;

  @IsOptional()
  @IsString()
  heureFin?: string;

  @IsOptional()
  estActive?: boolean;

  @IsOptional()
  @IsString()
  notes?: string;
}

/**
 * Category DTOs
 */
export class CreateCategorieDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  nom: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  iconUrl?: string;
}

export class UpdateCategorieDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  iconUrl?: string;

  @IsOptional()
  estActive?: boolean;
}

/**
 * Region DTOs
 */
export class CreateRegionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  nomRegion: string;
}

export class UpdateRegionDto {
  @IsOptional()
  @IsString()
  nomRegion?: string;


  @IsOptional()
  estActive?: boolean;
}

/**
 * Pagination DTO
 */
export class PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number = 0;
}
