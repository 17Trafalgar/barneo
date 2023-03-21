import { Module } from '@nestjs/common';
import { MappingService } from './mapping.service';
import { DownloadService } from 'src/download/download.service';
import { SuppliersService } from '../suppliers.service';

@Module({
  imports: [DownloadService, SuppliersService],
  providers: [MappingService],
  controllers: [],
  exports: [MappingService],
})
export class MappingModule {}
