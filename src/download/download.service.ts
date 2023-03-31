import * as xlsx from 'xlsx';
import * as FS from 'fs';
import * as Axios from 'axios';
import * as convert from 'xml-js';
import * as csvjson from 'csvjson';
import * as encoding from 'encoding';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { suppliersService } from 'src/suppliers/suppliers.service';
import { mappingService } from 'src/suppliers/mapping/mapping.service';
import { productsService } from 'src/product/product.service';

@Injectable()
export class downloadService {
  constructor(
    private readonly Axios: HttpService,
    private readonly suppiersService: suppliersService,
    private readonly productService: productsService,
    private readonly mappingService: mappingService,
  ) {}

  public async downloadFile(
    id: number,
    title: string,
    typeFile: string,
    urlFile: string,
  ): Promise<{ pathToFile: string; typeFile: string }> {
    try {
      const pathToFile = `./uploadedFiles/${title}_${id}.${typeFile}`;
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
      return finalObject['Прайс-лист'];
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
      const file = FS.readFileSync(path);
      const text = encoding.convert(file, 'UTF-8', 'WINDOWS-1251');
      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const data = convert.xml2json(text, options);
      return JSON.parse(data);
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

  public async mainConverter(supplierId: number): Promise<any> {
    try {
      const { id, title, typeFile, urlFile } =
        await this.suppiersService.getSupplier(supplierId);
      const pathToFile = await this.downloadFile(id, title, typeFile, urlFile);
      const product = await this[typeFile + 'ToJson'](pathToFile.pathToFile);
      //if suuplier encoding != untf-8,потом сделать кодировки
      const convert = this.mappingService.justCoffeConverter(product);
      const save: any = await this.productService.addManyProducts(convert);
      console.log(save);
      return save; // enum вместо toJson
    } catch (error) {
      console.log(error);
      throw new Error('File conversion error');
    }
  }

  public async uploadConverter(path: string): Promise<any> {
    try {
      const product = await this.xlsxToJson(path);
      const convert = this.mappingService.clenConverter(product);
      const save: any = await this.productService.addManyProducts(convert);
      return save;
    } catch (error) {
      console.log(error);
      throw new Error('File conversion error');
    }
  }
}
