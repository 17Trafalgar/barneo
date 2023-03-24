import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { downloadService } from 'src/download/download.service';
import { suppliersService } from '../suppliers.service';

@Injectable()
export class cronService {
  constructor(
    private readonly suppliersService: suppliersService,
    private readonly downloadService: downloadService,
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
          xml: this.downloadService.xmlToJson('./uploadedFiles/test.xml'),
          xlsx: this.downloadService.xlsxToJson('./uploadedFiles/test.xlsx'),
          yml: this.downloadService.ymlToJson('./uploadedFiles/test.yml'),
          csv: this.downloadService.csvToJson('./uploadedFiles/test.csv'),
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
