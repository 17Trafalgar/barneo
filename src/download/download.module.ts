import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProductModule } from 'src/product/product.module';
import { MappingModule } from 'src/suppliers/mapping/mapping.module';
import { SupplierModule } from 'src/suppliers/suppliers.module';
import { DownloadController } from './download.controller';
import { DownloadService } from './download.service';

@Module({
  imports: [MappingModule, HttpModule, SupplierModule, ProductModule],
  controllers: [DownloadController],
  providers: [DownloadService],
  exports: [DownloadService],
})
export class DownloadModule {}
