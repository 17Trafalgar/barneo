import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { CreateSupplierDTO } from './dto/create.supplier.dto';
import { UpdateSupplierDTO } from './dto/update.supplier.dto';
import { SuppliersService } from './suppliers.service';
import { FindOneParamId } from 'src/utils/findOneParam';

@Controller('suppliers')
export class SuppliersController {
  constructor(private suppliersService: SuppliersService) {}

  @Get()
  listSuppliers() {
    return this.suppliersService.getSuppliers();
  }

  @Get(':id')
  getById(@Param() { id }: FindOneParamId) {
    return this.suppliersService.getById(id);
  }

  @Post('create')
  createSupplier(@Body() body: CreateSupplierDTO) {
    return this.suppliersService.create(body);
  }

  @Delete('delete')
  deleteSupplierFromDB(@Body() body: FindOneParamId) {
    return this.suppliersService.deleteSupplier(body);
  }

  @Put('update')
  updateSupplierInDB(@Body() body: UpdateSupplierDTO) {
    return this.suppliersService.updateSupplier(body);
  }
}
