import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { ReservationsModule } from './reservations/reservations.module';
import { CommentairesModule } from './commentaires/commentaires.module';
import { CategoriesModule } from './categories/categories.module';
import { RegionsModule } from './regions/regions.module';
import { AvisModule } from './avis/avis.module';
import { DisponibiliteModule } from './disponibilites/disponibilite.module';
import { ServiceCategorieModule } from './service-categories/service-categorie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(getDatabaseConfig()),
    AuthModule,
    UsersModule,
    ServicesModule,
    ReservationsModule,
    CommentairesModule,
    CategoriesModule,
    RegionsModule,
    AvisModule,
    DisponibiliteModule,
    ServiceCategorieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
