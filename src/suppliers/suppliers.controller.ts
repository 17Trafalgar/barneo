import { Body, Controller, Post, Res, Get, Delete, Put } from '@nestjs/common';
import { CreateSupplierDTO } from './dto/create.supplier.dto';
import { DeleteSupplierDTO } from './dto/delete.supplier.dto';
import { UpdateSupplierDTO } from './dto/update.supplier.dto';
import { SuppliersService } from './suppliers.service';
import { GetSupplierDTO } from './dto/get.supplier.dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(private suppliersService: SuppliersService) {}

  @Get()
  async listSuppliers(@Res() res) {
    try {
      const result = await this.suppliersService.getSuppliers();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to get supplier list' });
    }
  }

  @Get('/supplier')
  async getOneSupplier(@Body() id: GetSupplierDTO, @Res() res) {
    try {
      const result = await this.suppliersService.getSupplier(id.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to get supplier' });
    }
  }

  @Post()
  async createSupplier(@Body() body: CreateSupplierDTO, @Res() res) {
    try {
      const result = await this.suppliersService.addSupplier(body);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Failed to create supplier' });
    }
  }

  @Delete()
  async deleteSupplierFromDB(@Body() body: DeleteSupplierDTO, @Res() res) {
    try {
      const result = await this.suppliersService.deleteSupplier(body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to delete supplier' });
    }
  }

  @Put()
  async updateSupplierInDB(@Body() body: UpdateSupplierDTO, @Res() res) {
    try {
      const result = await this.suppliersService.updateSupplier(body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update supplier' });
    }
  }
}
