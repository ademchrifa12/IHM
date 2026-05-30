import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateServiceDto {
  @IsInt() idCategorie!: number;
  @IsOptional() @IsInt() idSousCategorie?: number;
  @IsNotEmpty({ message: 'Le titre est obligatoire.' }) @IsString() titre!: string;
  @IsOptional() @IsString() description?: string;
  @IsNumber() @Min(0) prix!: number;
}

export class UpdateServiceDto {
  @IsOptional() @IsInt() idCategorie?: number;
  @IsOptional() @IsInt() idSousCategorie?: number;
  @IsOptional() @IsString() titre?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsNumber() @Min(0) prix?: number;
}
