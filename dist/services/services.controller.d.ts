import { ServicesService, CreateServiceDto, UpdateServiceDto } from './services.service';
export declare class ServicesController {
    private servicesService;
    constructor(servicesService: ServicesService);
    findAll(limit?: string, offset?: string): Promise<{
        data: import("../entities/service.entity").Service[];
        total: number;
    }>;
    search(query: string, categorieId?: string, regionId?: string, limit?: string, offset?: string): Promise<{
        data: import("../entities/service.entity").Service[];
        total: number;
    }>;
    findOne(id: string): Promise<import("../entities/service.entity").Service>;
    create(createServiceDto: CreateServiceDto): Promise<import("../entities/service.entity").Service>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<import("../entities/service.entity").Service>;
    delete(id: string): Promise<void>;
    findByPrestataire(idPrestataire: string): Promise<import("../entities/service.entity").Service[]>;
    addCategory(id: string, categoryId: string): Promise<import("../entities/service.entity").Service>;
    addRegion(id: string, regionId: string): Promise<import("../entities/service.entity").Service>;
}
