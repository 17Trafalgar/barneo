import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
  HttpException,
  HttpStatus,
  Res,
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
  async getById(@Param() { id }: FindOneParamId) {
    const supplier = await this.suppliersService.getById(id);
    if (!supplier) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Сould not find news',
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      return supplier;
    }
  }

  @Post('create')
  async createSupplier(@Body() body: CreateSupplierDTO, @Res() res) {
    try {
      const supplier = await this.suppliersService.create(body);
      res.status(201).json(supplier);
    } catch (error) {
      res.status(400).json({ message: 'Bad request' });
    }
  }

  @Delete(':id')
  async deleteSupplierFromDB(@Param() { id }: FindOneParamId) {
    const supplier = await this.suppliersService.getById(id);

    if (!supplier) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Сould not find news',
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      return this.suppliersService.delete(id);
    }
  }

  @Put('update')
  async updateSupplierInDB(@Body() body: UpdateSupplierDTO, @Res() res) {
    try {
      const updateSupplier = await this.suppliersService.update(body);
      res.status(201).json(updateSupplier);
    } catch (error) {
      res.status(400).json({ message: 'Bad request' });
    }
  }
}
