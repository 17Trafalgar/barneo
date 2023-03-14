import { Body, Controller, Post, Res, Get, Delete, Put } from '@nestjs/common';
import { createSupplierDTO } from './database/suppliers.dto/create.supplier.dto';
import { deleteSupplierDTO } from './database/suppliers.dto/delete.supplier.dto';
import { updateSupplierDTO } from './database/suppliers.dto/update.supplier.dto';
import { SuppliersService } from './suppliers.service';
import { getSupplierDTO } from './database/suppliers.dto/get.supplier.dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(private SuppliersService: SuppliersService) {}

  @Get()
  async listSuppliers(@Res() res) {
    try {
      const result = await this.SuppliersService.getSuppliers();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to get supplier list' });
    }
  }

  @Get('/supplier')
  async listSupplier(@Body() id: getSupplierDTO, @Res() res) {
    try {
      const result = await this.SuppliersService.getSupplier(id.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to get supplier' });
    }
  }

  @Post()
  async createSupplier(@Body() body: createSupplierDTO, @Res() res) {
    try {
      const result = await this.SuppliersService.addSupplier(body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create supplier' });
    }
  }

  @Delete()
  async deleteSupplierFromDB(@Body() body: deleteSupplierDTO, @Res() res) {
    try {
      const result = await this.SuppliersService.deleteSupplier(body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to delete user' });
    }
  }

  @Put()
  async updateSupplierInDB(@Body() body: updateSupplierDTO, @Res() res) {
    try {
      const result = await this.SuppliersService.updateSupplier(body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update user' });
    }
  }
}
