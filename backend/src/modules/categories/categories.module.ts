import { Body, Controller, Delete, Get, Module, Param, Post, UseGuards } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Categorie } from '../../entities/categorie.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@ApiTags('Catégories')
@Controller('categories')
export class CategoriesController {
  constructor(@InjectRepository(Categorie) private readonly repo: Repository<Categorie>) {}

  @Get()
  findAll() {
    return this.repo.find({ relations: ['sousCategories'] });
  }

  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles(UserRole.ADMIN)
  @Post()
  create(@Body('nom') nom: string) {
    return this.repo.save(this.repo.create({ nom }));
  }

  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.repo.delete(Number(id));
    return { message: 'Catégorie supprimée.' };
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Categorie])],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
