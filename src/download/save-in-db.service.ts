import { Injectable } from '@nestjs/common';
import { SuppliersService } from 'src/suppliers/suppliers.service';
import { MappingService } from 'src/suppliers/mapping/mapping.service';
import { ProductService } from 'src/product/product.service';
import { ConvertToJsonService } from './convert-to-json.service';
import { DownloadService } from './download.service';
import { ClientService } from './client/client.service';

@Injectable()
export class SaveInDbService {
  constructor(
    private readonly downloadService: DownloadService,
    private readonly productService: ProductService,
    private readonly mappingService: MappingService,
    private readonly suppiersService: SuppliersService,
    private readonly convertToJsonService: ConvertToJsonService,
    private readonly clientService: ClientService,
  ) {}

  async mainConverter(supplierId: number) {
    try {
      const convertToJson = {
        xml: this.convertToJsonService.xmlToJson,
        xlsx: this.convertToJsonService.xlsxToJson,
        yml: this.convertToJsonService.ymlToJson,
        csv: this.convertToJsonService.csvToJson,
        xls: this.convertToJsonService.xlsToJson,
      };

      const methodForParsing = {
        grkConverter: this.mappingService.grkConverter,
        clenConverter: this.mappingService.clenConverter,
        justCoffeeConverter: this.mappingService.justCoffeeConverter,
        wilmaxConverter: this.mappingService.wilmaxConverter,
        masterGlassConverter: this.mappingService.masterGlassConverter,
        abatConverter: this.mappingService.abatConverter,
        chttConverter: this.mappingService.chttConverter,
        redGastroConverter: this.mappingService.redGastroConverter,
        limarsConverter: this.mappingService.limarsConverter,
        project2015Converter: this.mappingService.project2015Converter,
        restinternationalConverter:
          this.mappingService.restinternationalConverter,
        hicoldConverter: this.mappingService.hicoldConverter,
        businessRusConverter: this.mappingService.businessRusConverter,
        restoinoxConverter: this.mappingService.restoinoxConverter,
        atesiConverter: this.mappingService.atesiConverter,
        sabotageDesignConverter: this.mappingService.sabotageDesignConverter,
        dobrinMskConverter: this.mappingService.dobrinMskConverter,
        dobrinSpbConverter: this.mappingService.dobrinSpbConverter,
        amenariConverter: this.mappingService.amenariConverter,
        vseSokiConverter: this.mappingService.vseSokiConverter,
      };

      const { id, title, typeFile, urlFile, parser, encoding } =
        await this.suppiersService.getSupplierById(supplierId);
      const pathToFile = await this.downloadService.download(
        urlFile,
        id,
        title,
        typeFile,
      );
      const json = await convertToJson[typeFile];
      const data = await json(pathToFile.pathToFile, encoding);
      const parsing = await methodForParsing[parser];
      const convert = await parsing(data);
      const save: any = await this.productService.addManyProducts(convert);
      console.log(save);
      return save;
    } catch (error) {
      console.log(error);
      throw new Error('File conversion error');
    }
  }

  async fileFromAPI(): Promise<any> {
    try {
      const data1 = await this.clientService.getStock();
      const data2 = await this.clientService.getPrice();
      const parseData = this.mappingService.complexBar(data1, data2);
      const save: any = await this.productService.addManyProducts(parseData);
      return save;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async imageSave(url: string): Promise<any> {
    try {
      const { pathToImage } = await this.downloadService.download(url);
      const convert = this.mappingService.imageConverter(pathToImage);
      const save: any = await this.productService.addManyProducts(convert);
      return save;
    } catch (error) {
      console.log(error);
      throw new Error('Path could not be saved');
    }
  }
}
