import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { createProductDTO } from './dto/create.product.dto';
import { deleteProductDTO } from './dto/delete.product.dto';
import { updateProductDTO } from './dto/update.product.dto';

@Injectable()
export class productsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  private getChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  getProduct(id: number) {
    return this.productsRepository.find({ where: { id } });
  }

  getProducts() {
    return this.productsRepository.find();
  }

  addProduct(product: createProductDTO) {
    return this.productsRepository.save(product);
  }

  addProducts(product: createProductDTO[]) {
    return this.productsRepository.save(product);
  }

  async addManyProducts(product: createProductDTO[]) {
    const resultArray = [];
    const chunks = this.getChunks(product, 100);
    for (const chunk of chunks) {
      resultArray.push(await this.addProducts(chunk));
    }
    return resultArray;
  }

  deleteProduct(product: deleteProductDTO) {
    return this.productsRepository.delete(product);
  }

  updateProduct(product: updateProductDTO) {
    return this.productsRepository.update(product.id, product);
  }
}
