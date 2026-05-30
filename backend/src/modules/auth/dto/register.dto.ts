import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '../../../common/enums';

export class RegisterDto {
  @IsNotEmpty({ message: 'Le nom est obligatoire.' })
  nom!: string;

  @IsNotEmpty({ message: 'Le prénom est obligatoire.' })
  prenom!: string;

  @IsEmail({}, { message: 'Adresse e-mail invalide.' })
  email!: string;

  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
  motDePasse!: string;

  @IsEnum(UserRole, { message: 'Rôle invalide. Choisir CLIENT ou PRESTATAIRE.' })
  role!: UserRole;
}
