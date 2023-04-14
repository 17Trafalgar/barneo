import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { createProductDTO } from './dto/create.product.dto';
import { deleteProductDTO } from './dto/delete.product.dto';
import { updateProductDTO } from './dto/update.product.dto';
import { PriceTable } from './entity/price.entity';
import { IProductCreate } from './interfaces/product.interface';

@Injectable()
export class productsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(PriceTable)
    private priceRepository: Repository<PriceTable>,
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

  addPrice(price: Partial<PriceTable>) {
    return this.priceRepository.save(price);
  }

  async addProduct(product: IProductCreate) {
    product.priceList = await this.addPrice(product.priceList);
    return this.productsRepository.save(product);
  }

  async addProducts(products: IProductCreate[]) {
    for (const product of products) {
      product.priceList = await this.addPrice(product.priceList);
    }
    return this.productsRepository.save(products);
  }

  async addManyProducts(product: IProductCreate[] | any) {
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
