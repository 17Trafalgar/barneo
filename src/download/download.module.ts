import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProductModule } from 'src/product/product.module';
import { SupplierModule } from 'src/suppliers/suppliers.module';
import { DownloadController } from './download.controller';
import { DownloadService } from './download.service';
import { ClientService } from './client/client.service';
import { ConvertToJsonService } from './convert-to-json.service';
import { SaveService } from './save-in-db.service';
import { FtpService } from './ftp.service';
import { UploadService } from './upload.service';
import { MappingModule } from 'src/mapping/mapping.module';

@Module({
  imports: [HttpModule, SupplierModule, ProductModule, MappingModule],
  controllers: [DownloadController],
  providers: [
    ClientService,
    DownloadService,
    ConvertToJsonService,
    SaveService,
    FtpService,
    UploadService,
  ],
  exports: [
    DownloadService,
    ClientService,
    ConvertToJsonService,
    SaveService,
    FtpService,
    UploadService,
  ],
})
export class DownloadModule {}
