import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UrlDto } from './dto/url.dto';
import * as xlsx from 'xlsx';
import * as FS from 'fs';
import * as Axios from 'axios';
import * as convert from 'xml-js';
import * as YAML from 'yaml';
import * as csv from 'csvtojson/v2';

/* const pathToXlsx = './uploadedFiles/file.xlsx'; */
/* const pathToXml = './uploadedFiles/file.xml'; */
/* const pathToYml = './uploadedFiles/file.yml'; */
const pathToCsv = './uploadedFiles/file.csv';

@Injectable()
export class DownloadService {
  constructor(private readonly axios: HttpService) {}

  public async getFileByUrl({ url }): Promise<any> {
    try {
      const writer = FS.createWriteStream(pathToCsv);
      // @ts-ignore
      const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream',
      });

      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(pathToCsv));
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

  public async ymlToJson(path: string): Promise<any> {
    try {
      const file = await FS.readFileSync(path, 'utf-8');
      const options = [true, false, 'maybe', null];
      const data = YAML.stringify(file, options);
      console.log(data);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async csvToJson(path: string): Promise<any> {
    try {
      const file = await FS.readFileSync(path, 'utf-8');
      const data = await csv({ flatKeys: true }, {})
        .fromString(file)
        .subscribe();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async mainXlsx(urlDto: UrlDto): Promise<string> {
    const path = await this.getFileByUrl(urlDto);
    const json = await this.xlsxToJson(path);
    return json;
  }

  async mainXml(urlDto: UrlDto): Promise<string> {
    const path = await this.getFileByUrl(urlDto);
    const json = await this.xmlToJson(path);
    return json;
  }

  async mainYml(urlDto: UrlDto): Promise<string> {
    const path = await this.getFileByUrl(urlDto);
    const json = await this.ymlToJson(path);
    return json;
  }

  async mainCsv(urlDto: UrlDto): Promise<string> {
    const path = await this.getFileByUrl(urlDto);
    const json = await this.csvToJson(path);
    return json;
  }
}
