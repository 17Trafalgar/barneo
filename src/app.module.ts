import { Module } from '@nestjs/common';
import { DownloadModule } from './download/download.module';
import { SupplierModule } from './suppliers/suppliers.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './suppliers/database/typeorm/typeorm.module';

@Module({
  imports: [
    SupplierModule,
    DownloadModule,
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
    DatabaseModule,
  ],
})
export class AppModule {}
