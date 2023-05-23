import { Body, Controller, Post, Res, Get, Delete, Put } from '@nestjs/common';
import { CreateProductDTO } from './dto/create.product.dto';
import { UpdateProductDTO } from './dto/update.product.dto';
import { DeleteProductDTO } from './dto/delete.product.dto';
import { ProductsService } from './product.service';
import { GetProductDTO } from './dto/get.product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async listProducts(@Res() res) {
    try {
      const result = await this.productsService.getProducts();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to get product list' });
    }
  }

  @Get('/product')
  async getOneProduct(@Body() id: GetProductDTO, @Res() res) {
    try {
      const result = await this.productsService.getProduct(id.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Failed to get product' });
    }
  }

  @Post()
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
