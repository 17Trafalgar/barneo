import { Controller, Res, Get, Query, Req, Post } from '@nestjs/common';
import { nezabudkaService } from './nezabudka.service';

@Controller('nezabudka')
export class nezabudkaController {
  constructor(private readonly nezabudkaService: nezabudkaService) {}

  @Get('auth')
  async nezabudkaAuth(@Query() @Res() res) {
    try {
      const result = await this.nezabudkaService.authorization();
      return result;
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error of authorization' });
    }
  }
  @Get('getFile')
  async nezabudkaGetFile(@Query() cookie: any, @Res() res) {
    try {
      const result = await this.nezabudkaService.getFile(cookie);
      return result;
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error of authorization' });
    }
  }
}
