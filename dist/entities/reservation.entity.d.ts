import { Client } from './client.entity';
import { Prestataire } from './prestataire.entity';
import { Service } from './service.entity';
import { Disponibilite } from './disponibilite.entity';
import { Avis } from './avis.entity';
export declare enum ReservationStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class Reservation {
    idReservation: string;
    statut: ReservationStatus;
    dateReservation: Date;
    dateExecution?: Date;
    prix: number;
    notes?: string;
    dateCreation: Date;
    dateModification: Date;
    client: Client;
    idClient: string;
    prestataire: Prestataire;
    idPrestataire: string;
    service: Service;
    idService: string;
    disponibilite?: Disponibilite;
    idDisponibilite?: string;
    avis?: Avis[];
    peutAvoirAvis(): boolean;
    ajouterAvis(avis: Avis): void;
}
