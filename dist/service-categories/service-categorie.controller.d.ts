import { ServiceCategorieService } from './service-categorie.service';
import { CreateServiceCategorieDto, UpdateServiceCategorieDto } from '../dto';
import { ServiceCategorie } from '../entities/service-categorie.entity';
export declare class ServiceCategorieController {
    private readonly serviceCategorieService;
    constructor(serviceCategorieService: ServiceCategorieService);
    create(createServiceCategorieDto: CreateServiceCategorieDto): Promise<ServiceCategorie>;
    findAll(idService?: string, idCategorie?: string): Promise<ServiceCategorie[]>;
    findByService(idService: string): Promise<ServiceCategorie[]>;
    findByCategorie(idCategorie: string): Promise<ServiceCategorie[]>;
    countServicesByCategorie(idCategorie: string): Promise<number>;
    findOne(id: string): Promise<ServiceCategorie>;
    update(id: string, updateServiceCategorieDto: UpdateServiceCategorieDto): Promise<ServiceCategorie>;
    remove(id: string): Promise<void>;
    addCategorieToService(idService: string, idCategorie: string, nom?: string): Promise<ServiceCategorie>;
    removeCategorieFromService(idService: string, idCategorie: string): Promise<void>;
}
