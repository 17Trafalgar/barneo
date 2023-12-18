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
import { CreateProductDTO } from './dto/create.product.dto';
import { UpdateProductDTO } from './dto/update.product.dto';
import { ProductService } from './product.service';
import { FindOneParamId } from 'src/utils/findOneParam';

@Controller('products')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Get('')
  getAll() {
    return this.productsService.getAll();
  }

  @Get(':id')
  async getById(@Param() { id }: FindOneParamId) {
    const product = await this.productsService.getById(id);

    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Сould not find news',
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      return product;
    }
  }

  @Post('create')
  async create(@Body() body: CreateProductDTO, @Res() res) {
    try {
      const product = await this.productsService.create(body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: 'Bad request' });
    }
  }

  @Delete(':id')
  async delete(@Param() { id }: FindOneParamId) {
    const product = await this.productsService.getById(id);

    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Сould not find news',
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      return this.productsService.delete(id);
    }
  }

  @Put('update-product')
  async updateProductInDB(@Body() body: UpdateProductDTO, @Res() res) {
    try {
      const updateProduct = await this.productsService.update(body);
      res.status(201).json(updateProduct);
    } catch (error) {
      res.status(400).json({ message: 'Bad request' });
    }
  }
}
