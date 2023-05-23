import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entity/supplier.entity';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { CreateSupplierDTO } from './dto/create.supplier.dto';
import { DeleteSupplierDTO } from './dto/delete.supplier.dto';
import { UpdateSupplierDTO } from './dto/update.supplier.dto';

@Injectable()
export class SuppliersService /* implements OnModuleInit */ {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
  ) {}

  /* async onModuleInit(): Promise<void> {
    const suppliers = await this.getSuppliers({});

    if (suppliers.length) return;

    await this.addSuppliers([
      this.addTableSupplier(),
      this.addTableSupplier(),
      this.addTableSupplier(),
      this.addTableSupplier(),
    ]);
  }

  addTableSupplier(supplier: Partial<createSupplierDTO> = {}) {
    return {
      title: '',
      typeFile: '',
      urlFile: '',
      parser: '',
      storage: [],
      ...supplier,
    };
  } */

  addSupplier(supplier: CreateSupplierDTO) {
    return this.suppliersRepository.save(supplier);
  }

  addSuppliers(supplier: CreateSupplierDTO[]) {
    return this.suppliersRepository.save(supplier);
  }

  getSupplier(id: number) {
    return this.suppliersRepository.findOne({ where: { id } });
  }

  getSuppliers(
    where: FindManyOptions['where'] = { title: Not(''), typeFile: Not('') },
  ) {
    return this.suppliersRepository.find({
      take: 10,
      where,
      relations: {
        storage: true,
      },
    });
  }

  deleteSupplier(supplier: DeleteSupplierDTO) {
    return this.suppliersRepository.delete(supplier);
  }

  updateSupplier(supplier: UpdateSupplierDTO) {
    return this.suppliersRepository.update(supplier.id, supplier);
  }
}
