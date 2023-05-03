import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { productModule } from 'src/product/product.module';
import { supplierModule } from 'src/suppliers/suppliers.module';
import { downloadController } from './download.controller';
import { downloadService } from './download.service';
/* import { ComplexbarClientServiceProvider } from './providers/complexbar-client-service.provider'; */
import { ClientService } from './client/client.service';

@Module({
  imports: [HttpModule, supplierModule, productModule],
  controllers: [downloadController],
  providers: [ClientService, downloadService],
  exports: [downloadService, ClientService],
})
export class downloadModule {}
