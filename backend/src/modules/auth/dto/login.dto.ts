import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Adresse e-mail invalide.' })
  email!: string;

  @IsNotEmpty({ message: 'Le mot de passe est obligatoire.' })
  motDePasse!: string;
}
