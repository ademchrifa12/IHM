import { Reservation } from './reservation.entity';
export declare enum AvisType {
    COMMENTAIRE = "commentaire",
    NOTE = "note"
}
export declare class Avis {
    idAvis: string;
    note?: number;
    contenu?: string;
    typeAvis: AvisType;
    dateCreation: Date;
    dateModification: Date;
    estVisible: boolean;
    nombreSignalement: number;
    reservation: Reservation;
    idReservation: string;
}
