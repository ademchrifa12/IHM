import { Controller, Get, Module, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { haversineKm } from '../../common/utils/geo';

@ApiTags('Géolocalisation')
@Controller('geolocation')
export class GeolocationController {
  @Get('distance')
  distance(
    @Query('lat1') lat1: number,
    @Query('lon1') lon1: number,
    @Query('lat2') lat2: number,
    @Query('lon2') lon2: number,
  ) {
    return { km: haversineKm(Number(lat1), Number(lon1), Number(lat2), Number(lon2)) };
  }
}

@Module({ controllers: [GeolocationController] })
export class GeolocationModule {}
