import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entity/supplier.entity';
import { Repository } from 'typeorm';
import { createSupplierDTO } from './dto/create.supplier.dto';
import { deleteSupplierDTO } from './dto/delete.supplier.dto';
import { updateSupplierDTO } from './dto/update.supplier.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DownloadService } from '../download/download.service';

@Injectable()
export class SuppliersService implements OnModuleInit {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
    private readonly DownloadService: DownloadService,
  ) {}

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
