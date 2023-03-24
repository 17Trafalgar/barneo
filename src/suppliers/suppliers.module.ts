import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entity/supplier.entity';
import { suppliersService } from './suppliers.service';
import { suppliersController } from './suppliers.controller';
import { mappingService } from './mapping/mapping.service';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  providers: [suppliersService, mappingService],
  controllers: [suppliersController],
  exports: [suppliersService, mappingService],
})
export class supplierModule {}
