import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/product/product.service';
import { DownloadService } from 'src/download/download.service';
import * as xlsx from 'xlsx';

@Injectable()
export class MappingService {
  constructor(
    private readonly ProductService: ProductsService,
    private readonly DownloadService: DownloadService,
  ) {}

  public async xlsxConverter() {
    try {
      const path = './uploadedFiles/test.xlsx';
      const data = xlsx.readFile(path);
      const result = [];
      data.SheetNames.forEach((sheetName) => {
        const row = xlsx.utils.sheet_to_json(data.Sheets[sheetName]);
        result[sheetName] = row;
      });
      console.log(result);
      await this.ProductService.addProducts(result);
    } catch (error) {
      throw new Error(error);
    }
  }
}
