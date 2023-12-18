import { Injectable } from '@nestjs/common';
import { SupplierEntity } from './entity/supplier.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateSupplierDTO } from './dto/create.supplier.dto';
import { UpdateSupplierDTO } from './dto/update.supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(SupplierEntity)
    private suppliersRepository: Repository<SupplierEntity>,
  ) {}

  create(supplier: CreateSupplierDTO): Promise<SupplierEntity> {
    return this.suppliersRepository.save({ ...supplier });
  }

  createMany(supplier: CreateSupplierDTO[]): Promise<SupplierEntity[]> {
    return this.suppliersRepository.save(supplier);
  }

  getById(id: number): Promise<SupplierEntity> {
    return this.suppliersRepository.findOne({
      where: { id },
      relations: { storage: true },
    });
  }

  getSuppliers() {
    return this.suppliersRepository.find({
      relations: {
        storage: true,
      },
    });
  }

  delete(id: number): Promise<DeleteResult> {
    return this.suppliersRepository.delete(id);
  }

  async update(dto: UpdateSupplierDTO): Promise<SupplierEntity> {
    const supplier = await this.getById(dto.id);

    return this.suppliersRepository.save({
      ...supplier,
    });
  }
}
