import { Service } from './service.entity';
import { Categorie } from './categorie.entity';
export declare class ServiceCategorie {
    idServiceCategorie: string;
    nom: string;
    description?: string;
    dateCreation: Date;
    categorie: Categorie;
    idCategorie: string;
    service: Service;
    idService: string;
}
