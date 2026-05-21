import { ServiceCategorie } from './service-categorie.entity';
export declare class Categorie {
    idCategorie: string;
    nom: string;
    description?: string;
    iconUrl?: string;
    estActive: boolean;
    serviceCategories: ServiceCategorie[];
}
