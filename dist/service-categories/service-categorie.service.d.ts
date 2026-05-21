import { Repository } from 'typeorm';
import { ServiceCategorie } from '../entities/service-categorie.entity';
import { Service } from '../entities/service.entity';
import { Categorie } from '../entities/categorie.entity';
import { CreateServiceCategorieDto, UpdateServiceCategorieDto } from '../dto';
export declare class ServiceCategorieService {
    private serviceCategorieRepository;
    private serviceRepository;
    private categorieRepository;
    constructor(serviceCategorieRepository: Repository<ServiceCategorie>, serviceRepository: Repository<Service>, categorieRepository: Repository<Categorie>);
    create(createServiceCategorieDto: CreateServiceCategorieDto): Promise<ServiceCategorie>;
    findAll(filters?: {
        idService?: string;
        idCategorie?: string;
    }): Promise<ServiceCategorie[]>;
    findOne(idServiceCategorie: string): Promise<ServiceCategorie>;
    findByService(idService: string): Promise<ServiceCategorie[]>;
    findByCategorie(idCategorie: string): Promise<ServiceCategorie[]>;
    update(idServiceCategorie: string, updateServiceCategorieDto: UpdateServiceCategorieDto): Promise<ServiceCategorie>;
    remove(idServiceCategorie: string): Promise<void>;
    addCategorieToService(idService: string, idCategorie: string, nom?: string): Promise<ServiceCategorie>;
    removeCategorieFromService(idService: string, idCategorie: string): Promise<void>;
    countServicesByCategorie(idCategorie: string): Promise<number>;
}
