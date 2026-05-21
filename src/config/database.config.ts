import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const getDatabaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'a_domicile_db',
  entities: [path.join(__dirname, '..', 'entities', '*.entity.ts')],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.DB_LOGGING === 'true',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  migrations: [path.join(__dirname, '..', 'migrations', '*.ts')],
  migrationsTableName: 'migrations',
});
