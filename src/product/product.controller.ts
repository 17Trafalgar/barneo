import { Body, Controller, Post, Res, Get, Delete, Put } from '@nestjs/common';
import { createProductDTO } from './dto/create.product.dto';
import { updateProductDTO } from './dto/update.product.dto';
import { deleteProductDTO } from './dto/delete.product.dto';
import { ProductsService } from './product.service';
import { getProductDTO } from './dto/get.product.dto';

@Controller('products')
export class ProductsController {
  constructor(private ProductsService: ProductsService) {}

  @Get()
  async listProducts(@Res() res) {
    try {
      const result = await this.ProductsService.getProducts();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to get product list' });
    }
  }

  @Get('/product')
  async getOneProduct(@Body() id: getProductDTO, @Res() res) {
    try {
      const result = await this.ProductsService.getProduct(id.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to get product' });
    }
  }

  @Post()
  async createProduct(@Body() body: createProductDTO, @Res() res) {
    try {
      const result = await this.ProductsService.addProduct(body);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Failed to create product' });
    }
  }

  @Delete()
  async deleteProductFromDB(@Body() body: deleteProductDTO, @Res() res) {
    try {
      const result = await this.ProductsService.deleteProduct(body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to delete product' });
    }
  }

  @Put()
  async updateProductInDB(@Body() body: updateProductDTO, @Res() res) {
    try {
      const result = await this.ProductsService.updateProduct(body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update product' });
    }
  }
}
