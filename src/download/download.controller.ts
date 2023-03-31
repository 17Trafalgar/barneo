import {
  Post,
  Controller,
  Get,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { downloadService } from './download.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { allFileFilter, editFileName } from './utils/upload-validator';

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

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploadedFiles',
        filename: editFileName,
      }),
      fileFilter: allFileFilter,
    }),
  )
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    try {
      const result = await this.downloadService.uploadConverter();
      return result;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}
