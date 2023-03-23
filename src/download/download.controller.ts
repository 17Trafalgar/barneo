import { Controller, Get, Query, Res } from '@nestjs/common';
import { DownloadService } from './download.service';

@Controller()
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get()
  async getFile(@Query() { id }, @Res() res) {
    try {
      const result = await this.downloadService.mainConverter(id);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Failed to get id of supplier' });
    }
  }
}
