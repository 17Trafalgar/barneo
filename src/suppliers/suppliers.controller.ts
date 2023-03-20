import { Body, Controller, Post, Res, Get, Delete, Put } from '@nestjs/common';
import { createSupplierDTO } from './dto/create.supplier.dto';
import { deleteSupplierDTO } from './dto/delete.supplier.dto';
import { updateSupplierDTO } from './dto/update.supplier.dto';
import { SuppliersService } from './suppliers.service';
import { getSupplierDTO } from './dto/get.supplier.dto';

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
  async getOneSupplier(@Body() id: getSupplierDTO, @Res() res) {
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
      res.status(400).json({ message: 'Failed to delete supplier' });
    }
  }

  @Put()
  async updateSupplierInDB(@Body() body: updateSupplierDTO, @Res() res) {
    try {
      const result = await this.SuppliersService.updateSupplier(body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update supplier' });
    }
  }
}
