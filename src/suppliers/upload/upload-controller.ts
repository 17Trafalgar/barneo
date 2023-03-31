import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller()
export class uploadController {
  constructor() {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @Body() body: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return {
        body,
        file: file.buffer.toString(),
      };
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}
