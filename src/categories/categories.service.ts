import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categorie } from '../entities/categorie.entity';

export class CreateCategorieDto {
  nom: string;
  description?: string;
  iconUrl?: string;
}

export class UpdateCategorieDto {
  nom?: string;
  description?: string;
  iconUrl?: string;
  estActive?: boolean;
}

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categorie)
    private categoriesRepository: Repository<Categorie>,
  ) {}

  async create(createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    if (!createCategorieDto.nom) {
      throw new BadRequestException('Category name is required');
    }

    const existingCategory = await this.categoriesRepository.findOne({
      where: { nom: createCategorieDto.nom },
    });

    if (existingCategory) {
      throw new ConflictException('Category already exists');
    }

    const categorie = this.categoriesRepository.create(createCategorieDto);
    return this.categoriesRepository.save(categorie);
  }

  async findAll(): Promise<Categorie[]> {
    return this.categoriesRepository.find({
      where: { estActive: true },
      relations: ['services'],
      order: { nom: 'ASC' },
    });
  }

  async findById(id: string): Promise<Categorie> {
    const categorie = await this.categoriesRepository.findOne({
      where: { idCategorie: id },
      relations: ['services'],
    });

    if (!categorie) {
      throw new NotFoundException('Category not found');
    }

    return categorie;
  }

  async update(
    id: string,
    updateCategorieDto: UpdateCategorieDto,
  ): Promise<Categorie> {
    const categorie = await this.findById(id);

    Object.assign(categorie, updateCategorieDto);
    return this.categoriesRepository.save(categorie);
  }

  async delete(id: string): Promise<void> {
    const result = await this.categoriesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Category not found');
    }
  }
}
