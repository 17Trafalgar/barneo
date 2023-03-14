import { Module } from '@nestjs/common';
import { DownloadModule } from './download/download.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from './config/configurations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './suppliers/database/entity/supplier.entity';
import { SupplierModule } from './suppliers/suppliers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('database.postgres'),
        entities: [Supplier],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    SupplierModule,
    DownloadModule,
  ],
})
export class AppModule {}
