import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from '../suppliers/database/entity/supplier.entity';
import { Repository } from 'typeorm';
import { createSupplierDTO } from './database/suppliers.dto/create.supplier.dto';
import { deleteSupplierDTO } from './database/suppliers.dto/delete.supplier.dto';
import { updateSupplierDTO } from './database/suppliers.dto/update.supplier.dto';

@Injectable()
export class SuppliersService implements OnModuleInit {
  onModuleInit() {
    console.log('The module has been initialized.');
  }

  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
  ) {}

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
