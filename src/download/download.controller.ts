import { Controller, Get, Query } from '@nestjs/common';
import { DownloadService } from './download.service';
import { UrlDto } from './Dto/url.dto';

@Controller()
export class DownController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get('csvToJson')
  public async setPrevImage(@Query() urlDto: UrlDto) {
    return this.downloadService.csvToJson(urlDto);
  }
}
