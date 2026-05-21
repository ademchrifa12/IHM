import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from '../entities/region.entity';

export class CreateRegionDto {
  nomRegion: string;
}

export class UpdateRegionDto {
  nomRegion?: string;
  estActive?: boolean;
}

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionsRepository: Repository<Region>,
  ) {}

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    if (!createRegionDto.nomRegion) {
      throw new BadRequestException('Region name is required');
    }

    const existingRegion = await this.regionsRepository.findOne({
      where: { nomRegion: createRegionDto.nomRegion },
    });

    if (existingRegion) {
      throw new ConflictException('Region already exists');
    }

    const region = this.regionsRepository.create(createRegionDto);
    return this.regionsRepository.save(region);
  }

  async findAll(): Promise<Region[]> {
    return this.regionsRepository.find({
      where: { estActive: true },
      relations: ['services'],
      order: { nomRegion: 'ASC' },
    });
  }

  async findById(id: string): Promise<Region> {
    const region = await this.regionsRepository.findOne({
      where: { idRegion: id },
      relations: ['services'],
    });

    if (!region) {
      throw new NotFoundException('Region not found');
    }

    return region;
  }

  async update(id: string, updateRegionDto: UpdateRegionDto): Promise<Region> {
    const region = await this.findById(id);

    Object.assign(region, updateRegionDto);
    return this.regionsRepository.save(region);
  }

  async delete(id: string): Promise<void> {
    const result = await this.regionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Region not found');
    }
  }
}
