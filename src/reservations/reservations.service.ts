import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation, ReservationStatus } from '../entities/reservation.entity';

export class CreateReservationDto {
  dateReservation: Date;
  dateExecution?: Date;
  idService: string;
  idClient: string;
  idPrestataire: string;
  notes?: string;
}

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
  ) {}

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    if (!createReservationDto.idService || !createReservationDto.idClient) {
      throw new BadRequestException('Missing required fields');
    }

    const reservation = this.reservationsRepository.create({
      ...createReservationDto,
      statut: ReservationStatus.PENDING,
    });

    return this.reservationsRepository.save(reservation);
  }

  async findAll(
    limit: number = 10,
    offset: number = 0,
  ): Promise<{ data: Reservation[]; total: number }> {
    const [data, total] = await this.reservationsRepository.findAndCount({
      relations: ['client', 'prestataire', 'service'],
      take: limit,
      skip: offset,
      order: { dateCreation: 'DESC' },
    });

    return { data, total };
  }

  async findById(id: string): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findOne({
      where: { idReservation: id },
      relations: ['client', 'prestataire', 'service'],
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return reservation;
  }

  async findByClient(idClient: string): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      where: { idClient },
      relations: ['service', 'prestataire'],
      order: { dateCreation: 'DESC' },
    });
  }

  async findByPrestataire(idPrestataire: string): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      where: { idPrestataire },
      relations: ['client', 'service'],
      order: { dateCreation: 'DESC' },
    });
  }

  async updateStatus(
    id: string,
    status: ReservationStatus,
  ): Promise<Reservation> {
    const reservation = await this.findById(id);

    reservation.statut = status;
    if (status === ReservationStatus.COMPLETED) {
      reservation.dateExecution = new Date();
    }

    return this.reservationsRepository.save(reservation);
  }

  async delete(id: string): Promise<void> {
    const result = await this.reservationsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Reservation not found');
    }
  }

  async getReservationsByStatus(
    status: ReservationStatus,
  ): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      where: { statut: status },
      relations: ['client', 'prestataire', 'service'],
      order: { dateCreation: 'DESC' },
    });
  }
}
