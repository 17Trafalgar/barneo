import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DownloadService } from 'src/download/download.service';
import { SuppliersService } from '../suppliers.service';

@Injectable()
export class CronService {
  constructor(
    private readonly SuppliersService: SuppliersService,
    private readonly DownloadService: DownloadService,
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
    const suppliers = await this.SuppliersService.getSuppliers();

    if (!suppliers.length) {
      console.log('Price lists of suppliers are missing');
      return;
    }
    Promise.all(suppliers).then((responses) => {
      for (const { typeFile, id } of responses) {
        const type = {
          xml: this.DownloadService.xmlToJson('./uploadedFiles/test.xml'),
          xlsx: this.DownloadService.xlsxToJson('./uploadedFiles/test.xlsx'),
          yml: this.DownloadService.ymlToJson('./uploadedFiles/test.yml'),
          csv: this.DownloadService.csvToJson('./uploadedFiles/test.csv'),
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
