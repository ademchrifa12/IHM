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
  RegionsService,
  CreateRegionDto,
  UpdateRegionDto,
} from './regions.service';
import { JwtAuthGuard, Roles } from '../auth/jwt-auth.guard';

@Controller('api/regions')
export class RegionsController {
  constructor(private regionsService: RegionsService) {}

  @Get()
  async findAll() {
    return this.regionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.regionsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(['admin'])
  @HttpCode(201)
  async create(@Body() createRegionDto: CreateRegionDto) {
    if (!createRegionDto.nomRegion) {
      throw new BadRequestException('Region name is required');
    }

    return this.regionsService.create(createRegionDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(['admin'])
  async update(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto,
  ) {
    return this.regionsService.update(id, updateRegionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(['admin'])
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.regionsService.delete(id);
  }
}
