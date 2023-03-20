import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { createProductDTO } from './dto/create.product.dto';
import { deleteProductDTO } from './dto/delete.product.dto';
import { updateProductDTO } from './dto/update.product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  getProduct(id: number) {
    return this.productsRepository.find({ where: { id } });
  }

  getProducts() {
    return this.productsRepository.find();
  }

  addProduct(product: createProductDTO) {
    return this.productsRepository.save(product);
  }

  deleteProduct(product: deleteProductDTO) {
    return this.productsRepository.delete(product);
  }

  updateProduct(product: updateProductDTO) {
    return this.productsRepository.update(product.id, product);
  }
}
