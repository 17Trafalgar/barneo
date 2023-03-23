import { Module } from '@nestjs/common';
import { DownloadModule } from './download/download.module';
import { SupplierModule } from './suppliers/suppliers.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/typeorm/typeorm.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ProductModule,
    SupplierModule,
    DownloadModule,
    DatabaseModule,
    ScheduleModule.forRoot(),
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
  ],
})
export class AppModule {}
