import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UrlDto } from './dto/url.dto';
import * as xlsx from 'xlsx';
import * as FS from 'fs';
import * as Axios from 'axios';
import * as convert from 'xml-js';

const pathToXlsx = './uploadedFiles/file.xlsx';
const pathToXml = './uploadedFiles/file.xml';

@Injectable()
export class DownloadService {
  constructor(private readonly axios: HttpService) {}

  public async getFileByUrl({ url }): Promise<any> {
    try {
      const writer = FS.createWriteStream(pathToXml);
      // @ts-ignore
      const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream',
      });

      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(pathToXml));
        writer.on('error', reject);
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public async xlsxToJson(path: string): Promise<any> {
    try {
      const file = await FS.readFileSync(path);
      const data = xlsx.read(file, { type: 'buffer' });
      const finalObject = {};
      data.SheetNames.forEach((sheetName) => {
        const rowObject = xlsx.utils.sheet_to_json(data.Sheets[sheetName]);
        finalObject[sheetName] = rowObject;
      });
      return finalObject;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async xmlToJson(path: string): Promise<any> {
    try {
      const file = await FS.readFileSync(path, 'utf-8');
      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const data = convert.xml2json(file, options);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async mainToXlsx(urlDto: UrlDto): Promise<string> {
    const path = await this.getFileByUrl(urlDto);
    const json = await this.xlsxToJson(path);
    return json;
  }

  async mainToXml(urlDto: UrlDto): Promise<string> {
    const path = await this.getFileByUrl(urlDto);
    const json = await this.xmlToJson(path);
    return json;
  }
}
