import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DownController } from './download.controller';
import { DownloadService } from './download.service';

@Module({
  imports: [HttpModule],
  controllers: [DownController],
  providers: [DownloadService],
})
export class DownloadModule {}
