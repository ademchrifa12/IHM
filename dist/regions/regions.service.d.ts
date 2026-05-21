import { Repository } from 'typeorm';
import { Region } from '../entities/region.entity';
export declare class CreateRegionDto {
    nomRegion: string;
}
export declare class UpdateRegionDto {
    nomRegion?: string;
    estActive?: boolean;
}
export declare class RegionsService {
    private regionsRepository;
    constructor(regionsRepository: Repository<Region>);
    create(createRegionDto: CreateRegionDto): Promise<Region>;
    findAll(): Promise<Region[]>;
    findById(id: string): Promise<Region>;
    update(id: string, updateRegionDto: UpdateRegionDto): Promise<Region>;
    delete(id: string): Promise<void>;
}
