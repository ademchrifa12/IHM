import { Body, Controller, Delete, Get, Module, Param, Post, Query, UseGuards } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SousCategorie } from '../../entities/sous-categorie.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@ApiTags('Sous-catégories')
@Controller('sous-categories')
export class SousCategoriesController {
  constructor(@InjectRepository(SousCategorie) private readonly repo: Repository<SousCategorie>) {}

  @Get()
  findAll(@Query('idCategorie') idCategorie?: number) {
    return idCategorie
      ? this.repo.find({ where: { categorie: { idCategorie: Number(idCategorie) } } })
      : this.repo.find();
  }

  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() body: { idCategorie: number; nom: string }) {
    return this.repo.save(
      this.repo.create({ nom: body.nom, categorie: { idCategorie: body.idCategorie } as any }),
    );
  }

  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.repo.delete(Number(id));
    return { message: 'Sous-catégorie supprimée.' };
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([SousCategorie])],
  controllers: [SousCategoriesController],
})
export class SousCategoriesModule {}
