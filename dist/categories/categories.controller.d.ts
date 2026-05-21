import { CategoriesService, CreateCategorieDto, UpdateCategorieDto } from './categories.service';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<import("../entities/categorie.entity").Categorie[]>;
    findOne(id: string): Promise<import("../entities/categorie.entity").Categorie>;
    create(createCategorieDto: CreateCategorieDto): Promise<import("../entities/categorie.entity").Categorie>;
    update(id: string, updateCategorieDto: UpdateCategorieDto): Promise<import("../entities/categorie.entity").Categorie>;
    delete(id: string): Promise<void>;
}
