import { Controller, Get, Query } from '@nestjs/common';
import { DownloadService } from './download.service';
import { UrlDto } from './dto/url.dto';

@Controller()
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get('xlsx')
  public async getFileXlsx(@Query() urlDto: UrlDto, enumKey: number) {
    return this.downloadService.mainConverter(urlDto, enumKey);
  }

  @Get('xml')
  public async getFileXml(@Query() urlDto: UrlDto, enumKey: number) {
    return this.downloadService.mainConverter(urlDto, enumKey);
  }

  @Get('yml')
  public async getFileYml(@Query() urlDto: UrlDto, enumKey: number) {
    return this.downloadService.mainConverter(urlDto, enumKey);
  }

  @Get('csv')
  public async getFileCsv(@Query() urlDto: UrlDto, enumKey: number) {
    return this.downloadService.mainConverter(urlDto, enumKey);
  }
}
