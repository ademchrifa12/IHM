"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_config_1 = require("./config/database.config");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const services_module_1 = require("./services/services.module");
const reservations_module_1 = require("./reservations/reservations.module");
const commentaires_module_1 = require("./commentaires/commentaires.module");
const categories_module_1 = require("./categories/categories.module");
const regions_module_1 = require("./regions/regions.module");
const avis_module_1 = require("./avis/avis.module");
const disponibilite_module_1 = require("./disponibilites/disponibilite.module");
const service_categorie_module_1 = require("./service-categories/service-categorie.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot((0, database_config_1.getDatabaseConfig)()),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            services_module_1.ServicesModule,
            reservations_module_1.ReservationsModule,
            commentaires_module_1.CommentairesModule,
            categories_module_1.CategoriesModule,
            regions_module_1.RegionsModule,
            avis_module_1.AvisModule,
            disponibilite_module_1.DisponibiliteModule,
            service_categorie_module_1.ServiceCategorieModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map