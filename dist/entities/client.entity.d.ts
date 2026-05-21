import { User } from './user.entity';
import { Reservation } from './reservation.entity';
export declare class Client {
    idClient: string;
    user: User;
    idUtilisateur: string;
    preferencesRecherche?: string;
    reservations?: Reservation[];
    rechercherService(criteres: any): any[];
    reserver(service: any): void;
    ajouterCommentaire(commentaire: string): void;
}
