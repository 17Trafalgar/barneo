import { Module } from '@nestjs/common';
import { DownloadModule } from './download/download.module';
import { SupplierModule } from './suppliers/suppliers.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/typeorm/typeorm.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './suppliers/cron/cron.module';
import { ProductModule } from './product/product.module';
/* import { MappingModule } from './suppliers/mapping/mapping.module'; */

@Module({
  imports: [
    /* MappingModule, */
    ProductModule,
    CronModule,
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
