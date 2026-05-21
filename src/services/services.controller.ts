import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import {
  ServicesService,
  CreateServiceDto,
  UpdateServiceDto,
} from './services.service';
import { JwtAuthGuard, Roles } from '../auth/jwt-auth.guard';

@Controller('api/services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  async findAll(
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
  ) {
    return this.servicesService.findAll(parseInt(limit), parseInt(offset));
  }

  @Get('search')
  async search(
    @Query('q') query: string,
    @Query('categorie') categorieId?: string,
    @Query('region') regionId?: string,
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
  ) {
    if (!query) {
      throw new BadRequestException('Search query is required');
    }

    return this.servicesService.search(
      query,
      categorieId,
      regionId,
      parseInt(limit),
      parseInt(offset),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.servicesService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(['prestataire'])
  @HttpCode(201)
  async create(@Body() createServiceDto: CreateServiceDto) {
    if (!createServiceDto.titre || !createServiceDto.description) {
      throw new BadRequestException('Missing required fields');
    }

    return this.servicesService.create(createServiceDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(['prestataire'])
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(['prestataire', 'admin'])
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.servicesService.delete(id);
  }

  @Get('prestataire/:idPrestataire')
  async findByPrestataire(@Param('idPrestataire') idPrestataire: string) {
    return this.servicesService.findByPrestataire(idPrestataire);
  }

  @Post(':id/categories/:categoryId')
  @UseGuards(JwtAuthGuard)
  @Roles(['prestataire'])
  async addCategory(
    @Param('id') id: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.servicesService.addCategory(id, categoryId);
  }

  @Post(':id/regions/:regionId')
  @UseGuards(JwtAuthGuard)
  @Roles(['prestataire'])
  async addRegion(
    @Param('id') id: string,
    @Param('regionId') regionId: string,
  ) {
    return this.servicesService.addRegion(id, regionId);
  }
}
