import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UrlDto } from './dto/url.dto';
import * as xlsx from 'xlsx';
import * as FS from 'fs';
import * as Axios from 'axios';
import * as convert from 'xml-js';
import * as YAML from 'yaml';
import * as csvjson from 'csvjson';
import path from 'path';

/* const pathToXlsx = './uploadedFiles/file.xlsx'; */
/* const pathToXml = './uploadedFiles/file.xml'; */
/* const pathToYml = './uploadedFiles/file.yml'; */
/* const pathToCsv = './uploadedFiles/file.csv'; */

enum Method {
  XML,
  XLSX,
  YML,
  CSV,
}

const suppLiers = [
  { id: 0, title: 'test.xml', typeFile: Method.XML, urlFile: 'url' },
  { id: 1, title: 'test.xlsx', typeFile: Method.XLSX, urlFile: 'url' },
  { id: 2, title: 'test.yml', typeFile: Method.YML, urlFile: 'url' },
  { id: 3, title: 'test.csv', typeFile: Method.CSV, urlFile: 'url' },
];

@Injectable()
export class DownloadService {
  constructor(private readonly Axios: HttpService) {}

  public async getFileByUrl({ url }, suppLiers): Promise<any> {
    try {
      const pathToFile = './uploadedFiles/' + `${suppLiers[0].title}`;
      const writer = FS.createWriteStream(pathToFile);
      // @ts-ignore
      const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream',
      });

      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(path));
        writer.on('error', reject);
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public async xlsxToJson(path: string): Promise<any> {
    try {
      const file = FS.readFileSync(path);
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
      const file = FS.readFileSync(path, 'utf-8');
      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const data = convert.xml2json(file, options);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async ymlToJson(path: string): Promise<any> {
    try {
      const file = FS.readFileSync(path, 'utf-8');
      const options = [true, false, 'maybe', null];
      const data = YAML.stringify(file, options);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async csvToJson(path: string): Promise<any> {
    try {
      const file = FS.readFileSync(path, 'utf-8');
      const options = { delimiter: ',', quote: '"' };
      const data = await csvjson.stream.toObject(JSON.stringify(file), options);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  typesMethods = {
    xml: this.xmlToJson,
    xlsx: this.xlsxToJson,
    yml: this.ymlToJson,
    csv: this.csvToJson,
  };

  async mainConverter(urlDto: UrlDto, enumKey: number): Promise<string> {
    if (enumKey === Method.XML) {
      const suppLier = suppLiers[0];
      const path = await this.getFileByUrl(urlDto, suppLier.typeFile);
      const method = this.typesMethods.xml;
      const json = method(path);
      return json;
    }

    if (enumKey === Method.XLSX) {
      const suppLier = suppLiers[1];
      const path = await this.getFileByUrl(urlDto, suppLier.typeFile);
      const method = this.typesMethods.xlsx;
      const json = method(path);
      return json;
    }

    if (enumKey === Method.YML) {
      const suppLier = suppLiers[2];
      const path = await this.getFileByUrl(urlDto, suppLier.typeFile);
      const method = this.typesMethods.yml;
      const json = method(path);
      return json;
    }

    if (enumKey === Method.CSV) {
      const suppLier = suppLiers[3];
      const path = await this.getFileByUrl(urlDto, suppLier.typeFile);
      const method = this.typesMethods.csv;
      const json = method(path);
      return json;
    }
  }
}
