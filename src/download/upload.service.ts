import { Injectable } from '@nestjs/common';
import { MappingService } from 'src/mapping/mapping.service';
import { ProductService } from 'src/product/product.service';
import { ConvertToJsonService } from './convert-to-json.service';

@Injectable()
export class UploadService {
  constructor(
    private readonly productService: ProductService,
    private readonly mappingService: MappingService,
    private readonly convertToJsonService: ConvertToJsonService,
  ) {}

  async uploadFile(path: string): Promise<any> {
    try {
      const product = await this.convertToJsonService.xlsxToJson(path);
      const convert = this.mappingService.clenConverter(product);
      const save: any = await this.productService.addManyProducts(convert);
      return save;
    } catch (error) {
      console.log(error);
      throw new Error('File conversion error');
    }
  }
}
