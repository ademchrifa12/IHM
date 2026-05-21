import { User } from './user.entity';
import { Reservation } from './reservation.entity';
import { Service } from './service.entity';
import { Disponibilite } from './disponibilite.entity';
export declare class Prestataire {
    idPrestataire: string;
    user: User;
    idUtilisateur: string;
    evaluationMoy: number;
    nombreAvis: number;
    experience?: string;
    estVerifie: boolean;
    certificationsUrl?: string;
    disponibleDef?: string;
    dateInscription: Date;
    services?: Service[];
    reservations?: Reservation[];
    disponibilites?: Disponibilite[];
    definirDisponibilite(disponibilites: Disponibilite[]): void;
    estDisponible(date: Date): boolean;
    proposerService(service: Service): void;
    gererProfil(): void;
    gererService(): void;
}
