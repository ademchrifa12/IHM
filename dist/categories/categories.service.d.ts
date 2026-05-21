import { Repository } from 'typeorm';
import { Categorie } from '../entities/categorie.entity';
export declare class CreateCategorieDto {
    nom: string;
    description?: string;
    iconUrl?: string;
}
export declare class UpdateCategorieDto {
    nom?: string;
    description?: string;
    iconUrl?: string;
    estActive?: boolean;
}
export declare class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Categorie>);
    create(createCategorieDto: CreateCategorieDto): Promise<Categorie>;
    findAll(): Promise<Categorie[]>;
    findById(id: string): Promise<Categorie>;
    update(id: string, updateCategorieDto: UpdateCategorieDto): Promise<Categorie>;
    delete(id: string): Promise<void>;
}
