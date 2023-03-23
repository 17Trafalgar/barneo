import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
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

  public async downloadFile(
    supplierId: number,
  ): Promise<{ pathToFile: string; typeFile: string }> {
    try {
      const { id, urlFile, title, typeFile } =
        await this.SuppiersService.getSupplier(supplierId);
      const pathToFile = `./uploadedFiles/${title}_${id}.${typeFile}`; //добавил id,чтобы в случае олинковых названий от разных компаний, он не перезаписался
      const writer = FS.createWriteStream(pathToFile);

      // @ts-ignore
      const response = await Axios({
        url: urlFile,
        method: 'GET',
        responseType: 'stream',
      });

      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve({ pathToFile, typeFile }));
        writer.on('error', reject);
      });
    } catch (error) {
      console.log(error);
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
      return this.MappingService.converterData(finalObject['Прайс-лист']);
    } catch (error) {
      console.log(error);
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

  public async mainConverter(supplierId: number): Promise<string> {
    try {
      const { pathToFile, typeFile } = await this.downloadFile(supplierId);
      const product = await this[typeFile + 'ToJson'](pathToFile);
      const save: any = await this.ProductService.addManyProducts(product);
      return save;
    } catch (error) {
      console.log(error);
      throw new Error('File conversion error');
    }
  }
}
