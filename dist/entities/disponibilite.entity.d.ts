import { Prestataire } from './prestataire.entity';
export declare class Disponibilite {
    idDisponibilite: string;
    joursDisponibles: number[];
    heureDebut: string;
    heureFin: string;
    estActive: boolean;
    notes?: string;
    dateCreation: Date;
    dateModification: Date;
    prestataire: Prestataire;
    idPrestataire: string;
}
