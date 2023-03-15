import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './supplier.entity/supplier.entity';
import { Repository } from 'typeorm';
import { createSupplierDTO } from './suppliers.dto/create.supplier.dto';
import { deleteSupplierDTO } from './suppliers.dto/delete.supplier.dto';
import { updateSupplierDTO } from './suppliers.dto/update.supplier.dto';

@Injectable()
export class SuppliersService implements OnModuleInit {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
  ) {}

  async onModuleInit(): Promise<void> {
    const suppliers = await this.getSuppliers();

    if (suppliers.length) return;

    await this.addSuppliers([
      this.createSupplier(),
      this.createSupplier(),
      this.createSupplier(),
      this.createSupplier(),
    ]);
  }

  createSupplier(supplier: Partial<createSupplierDTO> = {}) {
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
