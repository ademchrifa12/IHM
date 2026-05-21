import { Prestataire } from './prestataire.entity';
import { Region } from './region.entity';
import { Reservation } from './reservation.entity';
import { ServiceCategorie } from './service-categorie.entity';
export declare class Service {
    idService: string;
    titre: string;
    description: string;
    prix: number;
    experienceRequise: string;
    estValide: boolean;
    dateCreation: Date;
    dateModification: Date;
    imageUrl?: string;
    nombreCommandes: number;
    tauxSatisfaction: number;
    prestataire: Prestataire;
    idPrestataire: string;
    serviceCategories: ServiceCategorie[];
    regions: Region[];
    reservations?: Reservation[];
    fiches?: any[];
    calculDispo(): boolean;
    reserver(dateReservation: Date): Reservation | null;
}
