import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ClientsModule } from './modules/clients/clients.module';
import { PrestatairesModule } from './modules/prestataires/prestataires.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SousCategoriesModule } from './modules/sous-categories/sous-categories.module';
import { RegionsModule } from './modules/regions/regions.module';
import { VillesModule } from './modules/villes/villes.module';
import { ServicesModule } from './modules/services/services.module';
import { DisponibilitesModule } from './modules/disponibilites/disponibilites.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { CommentairesModule } from './modules/commentaires/commentaires.module';
import { StatistiquesModule } from './modules/statistiques/statistiques.module';
import { GeolocationModule } from './modules/geolocation/geolocation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mssql',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT') ?? 1433),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
        options: {
          encrypt: config.get<string>('DB_ENCRYPT') === 'true',
          trustServerCertificate: config.get<string>('DB_TRUST_SERVER_CERTIFICATE') === 'true',
        },
      }),
    }),
    AuthModule,
    UsersModule,
    ClientsModule,
    PrestatairesModule,
    CategoriesModule,
    SousCategoriesModule,
    RegionsModule,
    VillesModule,
    ServicesModule,
    DisponibilitesModule,
    ReservationsModule,
    CommentairesModule,
    StatistiquesModule,
    GeolocationModule,
  ],
})
export class AppModule {}
