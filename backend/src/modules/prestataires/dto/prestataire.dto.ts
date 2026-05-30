import { IsLatitude, IsLongitude, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePrestataireDto {
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() photo?: string;
  @IsOptional() @IsString() telephone?: string;
  @IsOptional() @IsString() adresse?: string;
  @IsOptional() @Type(() => Number) @IsLatitude() latitude?: number;
  @IsOptional() @Type(() => Number) @IsLongitude() longitude?: number;
}

export class SearchPrestatairesDto {
  @IsOptional() @Type(() => Number) idCategorie?: number;
  @IsOptional() @Type(() => Number) idSousCategorie?: number;
  @IsOptional() @Type(() => Number) idRegion?: number;
  @IsOptional() @Type(() => Number) idVille?: number;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) @Max(5) noteMin?: number;
  @IsOptional() @Type(() => Number) @IsLatitude() latitude?: number;
  @IsOptional() @Type(() => Number) @IsLongitude() longitude?: number;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(1) @Max(200) distanceKm?: number;
  @IsOptional() @IsString() q?: string;
  @IsOptional() @Type(() => Number) page?: number = 1;
  @IsOptional() @Type(() => Number) limit?: number = 10;
}
