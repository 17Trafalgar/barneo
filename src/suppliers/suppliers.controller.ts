import { Body, Controller, Post, Get, Delete, Put } from '@nestjs/common';
import { CreateSupplierDTO } from './dto/create.supplier.dto';
import { UpdateSupplierDTO } from './dto/update.supplier.dto';
import { SuppliersService } from './suppliers.service';
import FindOneParamId from 'src/download/utils/findOneParam';

@Controller('supplier')
export class SuppliersController {
  constructor(private suppliersService: SuppliersService) {}

  @Get('/all')
  listSuppliers() {
    return this.suppliersService.getSuppliers();
  }

  @Get('/id')
  getOneSupplier(@Body() { id }: FindOneParamId) {
    return this.suppliersService.getSupplierById(id);
  }

  @Post('/create-newSupplier')
  createSupplier(@Body() body: CreateSupplierDTO) {
    return this.suppliersService.addSupplier(body);
  }

  @Delete('/delete-supplier')
  deleteSupplierFromDB(@Body() body: FindOneParamId) {
    return this.suppliersService.deleteSupplier(body);
  }

  @Put('/update-supplier')
  updateSupplierInDB(@Body() body: UpdateSupplierDTO) {
    return this.suppliersService.updateSupplier(body);
  }
}
