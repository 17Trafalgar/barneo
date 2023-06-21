import * as FS from 'fs';
import Axios from 'axios';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SuppliersService } from 'src/suppliers/suppliers.service';
import { MappingService } from 'src/suppliers/mapping/mapping.service';
import { ProductService } from 'src/product/product.service';
import { ClientService } from './client/client.service';
import { ConvertToJsonService } from './convert-to-json.service';

@Injectable()
export class DownloadService {
  constructor(
    private readonly Axios: HttpService,
    private readonly convertToJsonService: ConvertToJsonService,
    private readonly suppiersService: SuppliersService,
    private readonly productService: ProductService,
    private readonly mappingService: MappingService,
    private readonly clientService: ClientService,
  ) {}

  async download(
    urlFile?: string,
    id?: number,
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
      const pathToFile = `./uploadedFiles/${title}_${id}.${typeFile}`;
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
