import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entity/supplier.entity';
import { suppliersService } from './suppliers.service';
import { suppliersController } from './suppliers.controller';
import { mappingService } from './mapping/mapping.service';
import { nezabudkaService } from './nezabudka/nezabudka.service';
import { nezabudkaController } from './nezabudka/nezabudka.controller';
import { HttpModule } from '@nestjs/axios';
import { uploadController } from './upload/upload-controller';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier]), HttpModule],
  providers: [suppliersService, mappingService, nezabudkaService],
  controllers: [suppliersController, nezabudkaController, uploadController],
  exports: [suppliersService, mappingService, nezabudkaService],
})
export class supplierModule {}
