import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entity/supplier.entity';
import { suppliersService } from './suppliers.service';
import { suppliersController } from './suppliers.controller';
import { mappingService } from './mapping/mapping.service';
import { nezabudkaService } from './nezabudkaSite/nezabudka.service';
import { nezabudkaController } from './nezabudkaSite/nezabudka.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier]), HttpModule],
  providers: [suppliersService, mappingService, nezabudkaService],
  controllers: [suppliersController, nezabudkaController],
  exports: [suppliersService, mappingService, nezabudkaService],
})
export class supplierModule {}
