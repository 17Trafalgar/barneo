import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/create.product.dto';
import { UpdateProductDTO } from './dto/update.product.dto';
import { DeleteProductDTO } from './dto/delete.product.dto';
import { ProductService } from './product.service';
import { FinndOneParamId } from 'src/download/utils/findOneParam';

@Controller('product')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Get('/all')
  async listProducts() {
    return this.productsService.getProducts();
  }

  @Get('id')
  getOneProduct(@Body() { id }: FinndOneParamId) {
    return this.productsService.getProductById(id);
  }

  @Post('/newProduct')
  async createProduct(@Body() body: CreateProductDTO, @Res() res) {
    try {
      const result = await this.productsService.addProduct(body);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Failed to create product' });
    }
  }

  @Delete()
  async deleteProductFromDB(@Body() body: DeleteProductDTO, @Res() res) {
    try {
      const result = await this.productsService.deleteProduct(body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to delete product' });
    }
  }

  @Put()
  async updateProductInDB(@Body() body: UpdateProductDTO, @Res() res) {
    try {
      const result = await this.productsService.updateProduct(body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update product' });
    }
  }
}
