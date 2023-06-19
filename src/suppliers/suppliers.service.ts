import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entity/supplier.entity';
import {
  DeleteResult,
  FindManyOptions,
  Not,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateSupplierDTO } from './dto/create.supplier.dto';
import { UpdateSupplierDTO } from './dto/update.supplier.dto';
import FindOneParamId from 'src/download/utils/findOneParam';

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

  async addSupplier(supplier: CreateSupplierDTO): Promise<Supplier> {
    const newSupplier = await this.suppliersRepository.save(supplier);
    return newSupplier;
  }

  async addSuppliers(supplier: CreateSupplierDTO[]): Promise<Supplier[]> {
    const newSuppliers = await this.suppliersRepository.save(supplier);
    return newSuppliers;
  }

  async getSupplierById(id: number): Promise<Supplier> {
    const supplier = await this.suppliersRepository.findOne({
      where: { id },
      relations: { storage: true },
    });
    if (!supplier) {
      throw new BadRequestException('Supplier with this ID was not found');
    }
    return supplier;
  }

  getSuppliers(
    where: FindManyOptions['where'] = { title: Not(''), typeFile: Not('') },
  ) {
    return this.suppliersRepository.find({
      take: 20,
      where,
      relations: {
        storage: true,
      },
    });
  }

  async deleteSupplier(supplier: FindOneParamId): Promise<DeleteResult> {
    const supplierForDeleting = await this.getSupplierById(supplier.id);
    if (!supplierForDeleting) {
      throw new BadRequestException('Could not find supplier');
    }
    return this.suppliersRepository.delete(supplier);
  }

  async updateSupplier(supplier: UpdateSupplierDTO): Promise<UpdateResult> {
    const supplierForUpdating = await this.getSupplierById(supplier.id);
    if (!supplierForUpdating) {
      throw new BadRequestException('Could not find supplier');
    }
    const updating = await this.suppliersRepository.update(
      supplier.id,
      supplier,
    );
    if (!updating) {
      throw new BadRequestException('Failed to update supplier');
    }
    return updating;
  }
}
