import { Controller, Get, Module, Query } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { Ville } from '../../entities/ville.entity';

@ApiTags('Villes')
@Controller('villes')
export class VillesController {
  constructor(@InjectRepository(Ville) private readonly repo: Repository<Ville>) {}
  @Get()
  findAll(@Query('idRegion') idRegion?: number) {
    return idRegion
      ? this.repo.find({ where: { region: { idRegion: Number(idRegion) } } })
      : this.repo.find();
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Ville])],
  controllers: [VillesController],
})
export class VillesModule {}
