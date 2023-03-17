import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SupplierModule } from 'src/suppliers/suppliers.module';
import { DownloadController } from './download.controller';
import { DownloadService } from './download.service';

@Module({
  imports: [HttpModule, SupplierModule],
  controllers: [DownloadController],
  providers: [DownloadService],
  exports: [DownloadService],
})
export class DownloadModule {}
