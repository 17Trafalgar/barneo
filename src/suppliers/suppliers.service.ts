import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './supplier.entity/supplier.entity';
import { Repository } from 'typeorm';
import { createSupplierDTO } from './suppliers.dto/create.supplier.dto';
import { deleteSupplierDTO } from './suppliers.dto/delete.supplier.dto';
import { updateSupplierDTO } from './suppliers.dto/update.supplier.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DownloadService } from '../download/download.service';

@Injectable()
export class SuppliersService implements OnModuleInit {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
    private readonly DownloadService: DownloadService,
  ) {}

  /* private isCronRunnig = false; */

  @Cron(CronExpression.EVERY_5_MINUTES)
  async downloadMethod() {
    /* if (this.isCronRunnig) {
      return;
    } else {
      this.isCronRunnig = true;
    } */
    console.log('Сron started');
    const suppliers = await this.getSuppliers();

    if (!suppliers.length) {
      console.log('Price lists of suppliers are missing');
      return;
    }

    for (const { typeFile, id } of suppliers) {
      const type = {
        'xml':this.DownloadService.xmlToJson('./uploadedFiles/test.xml'),
        'xlsx':this.DownloadService.xlsxToJson('./uploadedFiles/test.xlsx'),
        'yml':this.DownloadService.ymlToJson('./uploadedFiles/test.yml'),
        'csv':this.DownloadService.csvToJson('./uploadedFiles/test.csv')
      };
      try {
        await type[typeFile]
      } catch (error) {
        console.log(`Cron crash,supplier id ${id}`, {
          error: error.toString(),
        });
      }
    }
    /* this.isCronRunnig = false; */
    console.log('Cron finished');
  }

  async onModuleInit(): Promise<void> {
    const suppliers = await this.getSuppliers();

    if (suppliers.length) return;

    await this.addSuppliers([
      this.addTableSupplier(),
      this.addTableSupplier(),
      this.addTableSupplier(),
      this.addTableSupplier(),
    ]);
  }

  addTableSupplier(supplier: Partial<createSupplierDTO> = {}) {
    return { title: '', typeFile: '', urlFile: '', ...supplier };
  }

  addSuppliers(supplier: createSupplierDTO[]) {
    return this.suppliersRepository.save(supplier);
  }

  getSuppliers() {
    return this.suppliersRepository.find();
  }

  getSupplier(id: number) {
    return this.suppliersRepository.find({ where: { id } });
  }

  addSupplier(supplier: createSupplierDTO) {
    return this.suppliersRepository.save(supplier);
  }

  deleteSupplier(supplier: deleteSupplierDTO) {
    return this.suppliersRepository.delete(supplier);
  }

  updateSupplier(supplier: updateSupplierDTO) {
    return this.suppliersRepository.update(supplier.id, supplier);
  }
}
