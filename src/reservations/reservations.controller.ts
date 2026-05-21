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
import { ReservationsService, CreateReservationDto } from './reservations.service';
import { JwtAuthGuard, Roles } from '../auth/jwt-auth.guard';
import { ReservationStatus } from '../entities/reservation.entity';

@Controller('api/reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
  ) {
    return this.reservationsService.findAll(parseInt(limit), parseInt(offset));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(['client'])
  @HttpCode(201)
  async create(@Body() createReservationDto: CreateReservationDto) {
    if (
      !createReservationDto.idService ||
      !createReservationDto.dateReservation
    ) {
      throw new BadRequestException('Missing required fields');
    }

    return this.reservationsService.create(createReservationDto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @Roles(['prestataire', 'admin'])
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: ReservationStatus },
  ) {
    if (!body.status) {
      throw new BadRequestException('Status is required');
    }

    return this.reservationsService.updateStatus(id, body.status);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(['client', 'admin'])
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.reservationsService.delete(id);
  }

  @Get('client/:idClient')
  @UseGuards(JwtAuthGuard)
  async findByClient(@Param('idClient') idClient: string) {
    return this.reservationsService.findByClient(idClient);
  }

  @Get('prestataire/:idPrestataire')
  @UseGuards(JwtAuthGuard)
  async findByPrestataire(@Param('idPrestataire') idPrestataire: string) {
    return this.reservationsService.findByPrestataire(idPrestataire);
  }

  @Get('status/:status')
  @UseGuards(JwtAuthGuard)
  @Roles(['admin'])
  async getByStatus(@Param('status') status: string) {
    return this.reservationsService.getReservationsByStatus(status as ReservationStatus);
  }
}
