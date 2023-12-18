import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupplierEntity } from 'src/suppliers/entity/supplier.entity';
import { StorageEntity } from 'src/suppliers/entity/storage.entity';
import { ProductEntity } from 'src/product/entity/product.entity';
import { Image } from 'src/product/entity/images.entity';
import { PriceEntity } from 'src/product/entity/price.entity';

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
        entities: [
          SupplierEntity,
          StorageEntity,
          ProductEntity,
          Image,
          PriceEntity,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
