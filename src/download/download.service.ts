import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UrlDto } from './Dto/url.dto';
import * as xlsx from 'xlsx';
import * as fs from 'fs/promises';

@Injectable()
export class DownloadService {
  constructor(private readonly axios: HttpService) {}

  public async getFileByUrl({ url }): Promise<any> {
    try {
      const response = await this.axios.axiosRef.get(url, {
        responseType: 'stream',
      });
      const buffer = [];
      return new Promise((resolve, reject) => {
        return response.data
          .on('data', (chunk) => {
            buffer.push(chunk);
          })
          .on('end', () => resolve(Buffer.concat(buffer)))
          .on('error', reject);
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public async xlsxToJson(urlDto: UrlDto): Promise<any> {
    try {
      const buffer = await this.getFileByUrl(urlDto);
      const data = xlsx.read(buffer, { type: 'buffer' });
      const finalObject = {};
      data.SheetNames.forEach((sheetName) => {
        const listObject = xlsx.utils.sheet_to_json(data.Sheets[sheetName]);
        finalObject[sheetName] = listObject;
        console.log(finalObject);
      });
      await fs.writeFile(
        './uploadedFiles/price-list.json',
        JSON.stringify(finalObject),
      );
      return 'file upload';
    } catch (error) {
      throw new Error(error);
    }
  }
}
