import {
  Post,
  Controller,
  Get,
  Query,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SaveService } from './save-in-db.service';
import { FtpService } from './ftp.service';
import { UploadService } from './upload.service';
import { allFileFilter, editFileName } from 'src/utils/upload.files.validator';
import { FindOneParamId } from 'src/utils/findOneParam';

@Controller('download')
export class DownloadController {
  constructor(
    private readonly saveInDbService: SaveService,
    private readonly ftpService: FtpService,
    private readonly uploadService: UploadService,
  ) {}

  @Get(':id')
  getFile(@Param() { id }: FindOneParamId) {
    return this.saveInDbService.mainConverter(id);
  }

  @Get('image')
  getImage(@Query() { url }) {
    return this.saveInDbService.imageSave(url);
  }

  @Get('ftp')
  getFtp(@Query() localPath: string, remotePath: string) {
    return this.ftpService.ftpDownloadFile(localPath, remotePath);
  }

  @Get('API')
  async getFileAPI() {
    return this.saveInDbService.fileFromAPI();
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
    const pathToFile = './uploadedFiles/Price list.xlsx';
    const result = await this.uploadService.uploadFile(pathToFile);
    return result;
  }
}
