import {
  Body, Controller, Get, Module, NotFoundException, Param, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Commentaire } from '../../entities/commentaire.entity';
import { Client } from '../../entities/client.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';
import { CurrentUser, AuthUserPayload } from '../../common/decorators/current-user.decorator';

class CreateCommentaireDto {
  @IsInt() idPrestataire!: number;
  @IsInt() @Min(1) @Max(5) note!: number;
  @IsOptional() @IsString() commentaire?: string;
}

@ApiTags('Commentaires')
@Controller('commentaires')
export class CommentairesController {
  constructor(
    @InjectRepository(Commentaire) private readonly repo: Repository<Commentaire>,
    @InjectRepository(Client) private readonly clients: Repository<Client>,
  ) {}

  @Get()
  findAll(@Query('idPrestataire') idPrestataire?: number) {
    return this.repo.find({
      where: idPrestataire
        ? { prestataire: { idPrestataire: Number(idPrestataire) }, modere: true }
        : { modere: true },
      order: { dateCreation: 'DESC' },
    });
  }

  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles(UserRole.CLIENT)
  @Post()
  async create(@CurrentUser() u: AuthUserPayload, @Body() dto: CreateCommentaireDto) {
    const c = await this.clients.findOne({ where: { user: { idUser: u.sub } } });
    if (!c) throw new NotFoundException('Profil client introuvable.');
    return this.repo.save(
      this.repo.create({
        client: c,
        prestataire: { idPrestataire: dto.idPrestataire } as any,
        note: dto.note,
        commentaire: dto.commentaire,
        modere: true,
      }),
    );
  }

  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles(UserRole.ADMIN)
  @Patch(':id/moderation')
  async moderer(@Param('id') id: number, @Body('modere') modere: boolean) {
    const c = await this.repo.findOne({ where: { idCommentaire: Number(id) } });
    if (!c) throw new NotFoundException('Commentaire introuvable.');
    c.modere = !!modere;
    return this.repo.save(c);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Commentaire, Client])],
  controllers: [CommentairesController],
})
export class CommentairesModule {}
