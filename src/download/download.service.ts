import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UrlDto } from './Dto/url.dto';
import * as xlsx from 'xlsx';
import * as fs from 'fs/promises';

const path = './uploadedFiles/target.xlsx';

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
          .on('event', () => fs.writeFile(path, url))
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
      console.log({ buffer });
      const data = xlsx.read(buffer, { type: 'buffer' });
      const finalObject = {};
      data.SheetNames.forEach((sheetName) => {
        const rowObject = xlsx.utils.sheet_to_json(data.Sheets[sheetName]);
        finalObject[sheetName] = rowObject;
        console.log(finalObject);
      });
      /* await fs.writeFile(path, JSON.stringify(finalObject)); */
    } catch (error) {
      throw new Error(error);
    }
  }
  async main(urlDto: UrlDto): Promise<string> {
    const path = await this.getFileByUrl(urlDto);
    const json = await this.xlsxToJson(path);
    return json;
  }
}
