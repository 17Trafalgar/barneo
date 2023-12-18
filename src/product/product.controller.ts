import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/create.product.dto';
import { UpdateProductDTO } from './dto/update.product.dto';
import { ProductService } from './product.service';
import { FindOneParamId } from 'src/utils/findOneParam';

@Controller('product')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Get('/all')
  listProducts() {
    return this.productsService.getProducts();
  }

  @Get('/id')
  getOneProduct(@Body() { id }: FindOneParamId) {
    return this.productsService.getProductById(id);
  }

  @Post('/create-newProduct')
  createProduct(@Body() body: CreateProductDTO) {
    return this.productsService.addProduct(body);
  }

  @Delete('delete-product')
  deleteProductFromDB(@Body() body: FindOneParamId) {
    return this.productsService.deleteProduct(body);
  }

  @Put('update-product')
  updateProductInDB(@Body() body: UpdateProductDTO) {
    return this.productsService.updateProduct(body);
  }
}
