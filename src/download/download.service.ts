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
import { MappingService } from 'src/suppliers/mapping/mapping.service';
import { ProductsService } from 'src/product/product.service';

@Injectable()
export class DownloadService {
  constructor(
    private readonly Axios: HttpService,
    private readonly SuppiersService: SuppliersService,
    private readonly ProductService: ProductsService,
    private readonly MappingService: MappingService,
  ) {}

  public async getFileByUrl({ url }): Promise<string> {
    try {
      const pathToFile = './uploadedFiles/file.xlsx';
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
      const url = await this.SuppiersService.getSupplier(18);
      const path = await this.getFileByUrl(url);
      const json = await this.xlsxToJson(path);
      const convert = await this.MappingService.xlsxConverter(
        json['Прайс-лист'],
      );
      const save: any = await this.ProductService.addManyProducts(convert);
      return save;
      /* const path = await this.getFileByUrl(urlDto);
      const json = await this.xlsxToJson(path);
      const convert = await this.MappingService.xlsxConverter(
        json['Прайс-лист'],
      );
      const save: any = await this.ProductService.addManyProducts(convert);
      return save; */
    } catch (error) {
      throw new Error('File conversion error');
    }
  }
}
