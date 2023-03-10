import { Controller, Get, Query } from '@nestjs/common';
import { DownloadService } from './download.service';
import { UrlDto } from './dto/url.dto';

@Controller()
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get('xlsx')
  public async getFileXlsx(@Query() urlDto: UrlDto) {
    return this.downloadService.mainXlsx(urlDto);
  }

  @Get('xml')
  public async getFileXml(@Query() urlDto: UrlDto) {
    return this.downloadService.mainXml(urlDto);
  }

  @Get('yml')
  public async getFileYml(@Query() urlDto: UrlDto) {
    return this.downloadService.mainYml(urlDto);
  }

  @Get('csv')
  public async getFileCsv(@Query() urlDto: UrlDto) {
    return this.downloadService.mainCsv(urlDto);
  }
}
