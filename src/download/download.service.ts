import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UrlDto } from './dto/url.dto';
import * as xlsx from 'xlsx';
import * as FS from 'fs';
import * as Axios from 'axios';
import * as convert from 'xml-js';
import * as YAML from 'yaml';
import * as csvjson from 'csvjson';
import { SuppliersService } from 'src/suppliers/suppliers.service';

/* const pathToXml = './uploadedFiles/file.xml'; */

@Injectable()
export class DownloadService {
  constructor(
    private readonly Axios: HttpService,
    private readonly SuppiersService: SuppliersService,
  ) {}

  public async getFileByUrl({ url }): Promise<string> {
    try {
      const suppliers = await this.SuppiersService.getSuppliers();

      if (!suppliers.length) return;

      for (const { title, typeFile } of suppliers) {
        const pathToFile = './uploadedFiles' + `/${title}` + `.${typeFile}`;
        const writer = FS.createWriteStream(pathToFile);

        // @ts-ignore
        const response = await Axios({
          url,
          method: 'GET',
          responseType: 'stream',
        });

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
          writer.on('finish', () => resolve(pathToFile));
          writer.on('error', reject);
        });
      }
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

  //TODO: Не работает
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

  async mainConverter(urlDto: UrlDto): Promise<string> {
    try {
      const path = await this.getFileByUrl(urlDto);
      const types = await this.SuppiersService.getSuppliers();

      for (const { typeFile } of types) {
        if (typeFile == 'xlsx') {
          const json = await this.xlsxToJson(path);
          return json;
        } else if (typeFile == 'xml') {
          const json = await this.xmlToJson(path);
          return json;
        } else if (typeFile == 'yml') {
          const json = await this.ymlToJson(path);
          return json;
        } else if (typeFile == 'csv') {
          const json = await this.csvToJson(path);
          return json;
        }
      }
    } catch (error) {
      throw new Error('File conversion error');
    }
  }
}
