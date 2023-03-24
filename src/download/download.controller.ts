import { Controller, Get, Query, Res } from '@nestjs/common';
import { downloadService } from './download.service';

@Controller()
export class downloadController {
  constructor(private readonly downloadService: downloadService) {}

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
