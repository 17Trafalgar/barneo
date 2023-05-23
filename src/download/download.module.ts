import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProductModule } from 'src/product/product.module';
import { SupplierModule } from 'src/suppliers/suppliers.module';
import { DownloadController } from './download.controller';
import { DownloadService } from './download.service';
import { ClientService } from './client/client.service';

@Module({
  imports: [HttpModule, SupplierModule, ProductModule],
  controllers: [DownloadController],
  providers: [ClientService, DownloadService],
  exports: [DownloadService, ClientService],
})
export class DownloadModule {}
