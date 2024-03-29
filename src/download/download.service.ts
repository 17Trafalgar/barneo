import * as FS from 'fs';
import Axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DownloadService {
  constructor() {}

  async download(
    urlFile?: string,
    fileId?: number,
    title?: string,
    typeFile?: string,
    encoding?: string,
  ): Promise<{
    pathToFile?: string;
    typeFile?: string;
    pathToImage?: string;
    encoding?: string;
  }> {
    try {
      const pathToImage = './uploadedImages/test.jpg';
      const pathToFile = `./uploadedFiles/${title}_${fileId}.${typeFile}`;
      const writer = FS.createWriteStream(pathToFile);

      const response = await Axios({
        url: urlFile,
        method: 'GET',
        responseType: 'stream',
        auth: { username: 'vx_price_dlr', password: 'lefKJ38dj92' },
      });

      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () =>
          resolve({ pathToFile, typeFile, pathToImage, encoding }),
        );
        writer.on('error', reject);
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
