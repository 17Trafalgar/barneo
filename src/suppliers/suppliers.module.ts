import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entity/supplier.entity';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { MappingService } from './mapping/mapping.service';
import { NezabudkaService } from './nezabudkaSite/nezabudka.service';
import { NezabudkaController } from './nezabudkaSite/nezabudka.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier]), HttpModule],
  providers: [SuppliersService, MappingService, NezabudkaService],
  controllers: [SuppliersController, NezabudkaController],
  exports: [SuppliersService, MappingService, NezabudkaService],
})
export class SupplierModule {}
