import { Repository } from 'typeorm';
import { Reservation, ReservationStatus } from '../entities/reservation.entity';
export declare class CreateReservationDto {
    dateReservation: Date;
    dateExecution?: Date;
    idService: string;
    idClient: string;
    idPrestataire: string;
    notes?: string;
}
export declare class ReservationsService {
    private reservationsRepository;
    constructor(reservationsRepository: Repository<Reservation>);
    create(createReservationDto: CreateReservationDto): Promise<Reservation>;
    findAll(limit?: number, offset?: number): Promise<{
        data: Reservation[];
        total: number;
    }>;
    findById(id: string): Promise<Reservation>;
    findByClient(idClient: string): Promise<Reservation[]>;
    findByPrestataire(idPrestataire: string): Promise<Reservation[]>;
    updateStatus(id: string, status: ReservationStatus): Promise<Reservation>;
    delete(id: string): Promise<void>;
    getReservationsByStatus(status: ReservationStatus): Promise<Reservation[]>;
}
