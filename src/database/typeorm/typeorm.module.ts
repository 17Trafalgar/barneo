import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Supplier } from '../../suppliers/entity/supplier.entity';
import { Product } from 'src/product/entity/product.entity';
import { PriceTable } from 'src/product/entity/price.entity';
import { Storages } from 'src/suppliers/entity/storage.entity';
import { Image } from 'src/product/entity/images.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [Supplier, Product, PriceTable, Storages, Image],
        synchronize: true,
        /* logging: true, */
      }),
    }),
  ],
})
export class databaseModule {}
