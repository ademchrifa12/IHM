import { Service } from './service.entity';
export declare class FicheService {
    idFiche: string;
    titre: string;
    prix: number;
    categorieId: string;
    regionId: string;
    experienceRequise: string;
    dateCreation: Date;
    dateModification: Date;
    imageUrl?: string;
    service: Service;
    idService: string;
}
