import { BadRequestException, Injectable } from '@nestjs/common';
import { SupplierEntity } from './entity/supplier.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSupplierDTO } from './dto/create.supplier.dto';
import { UpdateSupplierDTO } from './dto/update.supplier.dto';
import { FindOneParamId } from 'src/utils/findOneParam';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(SupplierEntity)
    private suppliersRepository: Repository<SupplierEntity>,
  ) {}

  async create(supplier: CreateSupplierDTO): Promise<SupplierEntity> {
    return this.suppliersRepository.save({ ...supplier });
  }

  async addSuppliers(supplier: CreateSupplierDTO[]): Promise<SupplierEntity[]> {
    const newSuppliers = await this.suppliersRepository.save(supplier);
    return newSuppliers;
  }

  async getById(id: number): Promise<SupplierEntity> {
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

  async deleteSupplier(supplier: FindOneParamId): Promise<DeleteResult> {
    const supplierForDeleting = await this.getById(supplier.id);
    if (!supplierForDeleting) {
      throw new BadRequestException('Could not find supplier');
    }
    return this.suppliersRepository.delete(supplier);
  }

  async updateSupplier(supplier: UpdateSupplierDTO): Promise<UpdateResult> {
    const supplierForUpdating = await this.getById(supplier.id);
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
