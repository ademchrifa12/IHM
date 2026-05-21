import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { Categorie } from '../entities/categorie.entity';
import { Region } from '../entities/region.entity';
export declare class CreateServiceDto {
    titre: string;
    description: string;
    prix: number;
    experienceRequise: string;
    imageUrl?: string;
    idPrestataire: string;
}
export declare class UpdateServiceDto {
    titre?: string;
    description?: string;
    prix?: number;
    experienceRequise?: string;
    imageUrl?: string;
}
export declare class ServicesService {
    private servicesRepository;
    private categoriesRepository;
    private regionsRepository;
    constructor(servicesRepository: Repository<Service>, categoriesRepository: Repository<Categorie>, regionsRepository: Repository<Region>);
    create(createServiceDto: CreateServiceDto): Promise<Service>;
    findAll(limit?: number, offset?: number): Promise<{
        data: Service[];
        total: number;
    }>;
    findById(id: string): Promise<Service>;
    findByPrestataire(idPrestataire: string): Promise<Service[]>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service>;
    delete(id: string): Promise<void>;
    search(query: string, categorieId?: string, regionId?: string, limit?: number, offset?: number): Promise<{
        data: Service[];
        total: number;
    }>;
    addCategory(serviceId: string, categoryId: string): Promise<Service>;
    addRegion(serviceId: string, regionId: string): Promise<Service>;
}
