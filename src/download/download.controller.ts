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
import { allFileFilter, editFileName } from './utils/upload.files.validator';

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

  @Get('image')
  async getImage(@Query() { url }, @Res() res) {
    try {
      const result = await this.downloadService.imageSave(url);
      return result;
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Failed to get image' });
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
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    try {
      const pathToFile = './uploadedFiles/Price list.xlsx';
      const result = await this.downloadService.uploadConverter(pathToFile);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to send file');
    }
  }

  @Get('ftp')
  async getFtp(@Query() localPath: string, remotePath: string, @Res() res) {
    try {
      const result = await this.downloadService.ftpDownloadFile(
        localPath,
        remotePath,
      );
      return result;
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Failed to get data from server' });
    }
  }

  @Get('red')
  async redGastroAuth(@Query() @Res() res) {
    try {
      const result = await this.downloadService.test();
      return result;
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error of authorization' });
    }
  }
}
