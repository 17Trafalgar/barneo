import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { DownloadModule } from 'src/download/download.module';
import { SupplierModule } from '../suppliers.module';

@Module({
  imports: [DownloadModule, SupplierModule],
  providers: [CronService],
  controllers: [],
  exports: [CronService],
})
export class CronModule {}
