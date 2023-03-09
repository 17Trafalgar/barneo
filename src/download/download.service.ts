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
}
