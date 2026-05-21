import { ReservationsService, CreateReservationDto } from './reservations.service';
import { ReservationStatus } from '../entities/reservation.entity';
export declare class ReservationsController {
    private reservationsService;
    constructor(reservationsService: ReservationsService);
    findAll(limit?: string, offset?: string): Promise<{
        data: import("../entities/reservation.entity").Reservation[];
        total: number;
    }>;
    findOne(id: string): Promise<import("../entities/reservation.entity").Reservation>;
    create(createReservationDto: CreateReservationDto): Promise<import("../entities/reservation.entity").Reservation>;
    updateStatus(id: string, body: {
        status: ReservationStatus;
    }): Promise<import("../entities/reservation.entity").Reservation>;
    delete(id: string): Promise<void>;
    findByClient(idClient: string): Promise<import("../entities/reservation.entity").Reservation[]>;
    findByPrestataire(idPrestataire: string): Promise<import("../entities/reservation.entity").Reservation[]>;
    getByStatus(status: string): Promise<import("../entities/reservation.entity").Reservation[]>;
}
