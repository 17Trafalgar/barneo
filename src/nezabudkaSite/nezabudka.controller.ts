import { Controller, Res, Get, Query, Req, Post } from '@nestjs/common';
import { NezabudkaService } from './nezabudka.service';

@Controller('nezabudka')
export class NezabudkaController {
  constructor(private readonly nezabudkaService: NezabudkaService) {}

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
