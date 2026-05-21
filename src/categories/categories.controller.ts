import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import {
  CategoriesService,
  CreateCategorieDto,
  UpdateCategorieDto,
} from './categories.service';
import { JwtAuthGuard, Roles } from '../auth/jwt-auth.guard';

@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoriesService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(['admin'])
  @HttpCode(201)
  async create(@Body() createCategorieDto: CreateCategorieDto) {
    if (!createCategorieDto.nom) {
      throw new BadRequestException('Category name is required');
    }

    return this.categoriesService.create(createCategorieDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(['admin'])
  async update(
    @Param('id') id: string,
    @Body() updateCategorieDto: UpdateCategorieDto,
  ) {
    return this.categoriesService.update(id, updateCategorieDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(['admin'])
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.categoriesService.delete(id);
  }
}
