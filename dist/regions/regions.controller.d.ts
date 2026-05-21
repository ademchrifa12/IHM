import { RegionsService, CreateRegionDto, UpdateRegionDto } from './regions.service';
export declare class RegionsController {
    private regionsService;
    constructor(regionsService: RegionsService);
    findAll(): Promise<import("../entities/region.entity").Region[]>;
    findOne(id: string): Promise<import("../entities/region.entity").Region>;
    create(createRegionDto: CreateRegionDto): Promise<import("../entities/region.entity").Region>;
    update(id: string, updateRegionDto: UpdateRegionDto): Promise<import("../entities/region.entity").Region>;
    delete(id: string): Promise<void>;
}
