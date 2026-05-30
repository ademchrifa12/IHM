import { Controller, Get, Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { Region } from '../../entities/region.entity';

@ApiTags('Régions')
@Controller('regions')
export class RegionsController {
  constructor(@InjectRepository(Region) private readonly repo: Repository<Region>) {}
  @Get() findAll() { return this.repo.find({ relations: ['villes'] }); }
}

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  controllers: [RegionsController],
})
export class RegionsModule {}
