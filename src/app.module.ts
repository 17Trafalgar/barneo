import { Module } from '@nestjs/common';
import { DownloadModule } from './download/download.module';
import { SupplierModule } from './suppliers/suppliers.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/typeorm.module';
import { ProductModule } from './product/product.module';
import { MulterModule } from '@nestjs/platform-express';
import { MappingModule } from './mapping/mapping.module';
import { NezabudkaModule } from './nezabudkaSite/nezabudka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    MulterModule.register({
      dest: './uploadedFiles',
    }),
    ProductModule,
    SupplierModule,
    DownloadModule,
    DatabaseModule,
    MappingModule,
    NezabudkaModule,
  ],
})
export class AppModule {}
