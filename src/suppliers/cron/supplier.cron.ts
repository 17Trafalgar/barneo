import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SuppliersService } from '../suppliers.service';
import { ConvertToJsonService } from 'src/download/convert-to-json.service';

@Injectable()
export class CronService {
  constructor(
    private readonly suppliersService: SuppliersService,
    private readonly convertToJsonService: ConvertToJsonService,
  ) {}

  private isCronRunnig = false;

  @Cron(CronExpression.EVERY_10_MINUTES)
  async downloadMethod() {
    if (this.isCronRunnig) {
      return;
    } else {
      this.isCronRunnig = true;
    }
    console.log('Сron started');
    const suppliers = await this.suppliersService.getSuppliers();

    if (!suppliers.length) {
      console.log('Price lists of suppliers are missing');
      return;
    }
    Promise.all(suppliers).then((responses) => {
      for (const { typeFile, id } of responses) {
        const type = {
          xml: this.convertToJsonService.xmlToJson('./uploadedFiles/test.xml'),
          xls: this.convertToJsonService.xlsToJson('./uploadedFiles/test.xml'),
          xlsx: this.convertToJsonService.xlsxToJson(
            './uploadedFiles/test.xlsx',
          ),
          yml: this.convertToJsonService.ymlToJson('./uploadedFiles/test.yml'),
          csv: this.convertToJsonService.csvToJson('./uploadedFiles/test.csv'),
        };
        try {
          type[typeFile];
        } catch (error) {
          console.log(`Cron crash,supplier id ${id}`, {
            error: error.toString(),
          });
        }
      }
    });

    this.isCronRunnig = false;
    console.log('Cron finished');
  }
}
