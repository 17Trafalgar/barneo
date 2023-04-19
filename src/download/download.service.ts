import * as xlsx from 'xlsx';
import * as FS from 'fs';
import Axios from 'axios';
import * as convert from 'xml-js';
import * as csvjson from 'csvjson';
import * as encoding from 'encoding';
import * as ftp from 'basic-ftp';
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

  public async downloadImage(url: string): Promise<any> {
    try {
      const pathToImage = `./uploadedImages/test.jpg`;
      const writer = FS.createWriteStream(pathToImage);

      // @ts-ignore
      const response = await Axios({
        url: url,
        method: 'GET',
        responseType: 'stream',
      });

      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(pathToImage));
        writer.on('error', reject);
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  public async authorization(): Promise<any> {
    try {
      const pathToImage = './uploadedFiles/Price list.xlsx';
      const writer = FS.createWriteStream(pathToImage);

      const response = await Axios({
        url: 'https://vistex.ru/1c-price/xls/pricelist.xlsx',
        method: 'GET',
        responseType: 'stream',
        auth: { username: 'vx_price_dlr', password: 'lefKJ38dj92' },
      });

      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(pathToImage));
        writer.on('error', reject);
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  public async ftpDownloadFile(
    localPath: string,
    remotePath: string,
  ): Promise<any> {
    /*  const client = new Client();
    await client.on('ready', function () {
      client.get('ÂûãðóçêàYML_03042023151015.xml', function (err, stream) {
        if (err) throw err;
        stream.once('close', function () {
          client.end();
        });
        stream.pipe(
          FS.createWriteStream('./uploadedFiles/foo.local-copy.xml', 'utf-8'),
        );
      });
    });

    /* await client.connect({
      host: 'ftp.klen-net.ru',
      user: 'klen',
      password: '46ryfhVN',
    }); */

    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
      await client.access({
        host: 'ftp.klen-net.ru',
        user: 'klen',
        password: '46ryfhVN',
        secure: true,
      });
      const list = (await client.list())[0].name;
      console.log({ list });
      await client.downloadTo(process.cwd() + '1.xml', list);
    } catch (err) {
      console.log(err);
      client.close();
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
      return finalObject['TDSheet'];
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  public async xmlToJson(path: string): Promise<any> {
    try {
      const file = FS.readFileSync(path);
      const text = encoding.convert(file, 'UTF-8', 'WINDOWS-1251');
      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const data = convert.xml2json(text, options);
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
      throw new Error(error);
    }
  }

  public async mainConverter(supplierId: number) {
    try {
      const methodToJson = {
        xml: this.xmlToJson,
        xlsx: this.xlsxToJson,
        yml: this.ymlToJson,
        csv: this.csvToJson,
      };

      const methodToConvert = {
        grkConverter: this.mappingService.grkConverter,
        clenConverter: this.mappingService.clenConverter,
        justCoffeConverter: this.mappingService.justCoffeConverter,
        wilmaxConverter: this.mappingService.wilmaxConverter,
        masterGlassConverter: this.mappingService.masterGlassConverter,
        abatConverter: this.mappingService.abatConverter,
        chttConverter: this.mappingService.chttConverter,
        redGastroConverter: this.mappingService.redGastroConverter,
      };

      const { id, title, typeFile, urlFile, parser } =
        await this.suppiersService.getSupplier(supplierId);
      const pathToFile = await this.downloadFile(id, title, typeFile, urlFile);
      const methodForParser = await methodToJson[typeFile];
      const product = await methodForParser(pathToFile.pathToFile);
      const methodConvertForData = await methodToConvert[parser];
      const convert = await methodConvertForData(product);
      const save: any = await this.productService.addManyProducts(convert);
      console.log(save);
      /* console.log(product);
      return product; */
    } catch (error) {
      console.log(error);
      throw new Error('File conversion error');
    }
  }

  public async test(): Promise<any> {
    try {
      const path = await this.authorization();
      const product = await this.xlsxToJson(path);
      const convert = this.mappingService.redGastroConverter(product);
      /* const save: any = await this.productService.addManyProducts(convert);
      console.log(save);
      return save; */
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

  public async imageSave(url: string): Promise<any> {
    try {
      const pathToImages = await this.downloadImage(url);
      const convert = this.mappingService.imageConverter(pathToImages);
      const save: any = await this.productService.addManyProducts(convert);
      return save;
    } catch (error) {
      console.log(error);
      throw new Error('Path could not be saved');
    }
  }
}
