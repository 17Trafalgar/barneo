import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { DeleteProductDTO } from './dto/delete.product.dto';
import { UpdateProductDTO } from './dto/update.product.dto';
import { PriceTable } from './entity/price.entity';
import { IProductCreate } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
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
    return this.productsRepository.findOne({ where: { id } });
  }

  getProducts() {
    return this.productsRepository.find();
  }

  addPrice(price: Partial<PriceTable>) {
    return this.priceRepository.save(price);
  }

  addProduct(product: IProductCreate) {
    return this.productsRepository.save(product);
  }

  addProducts(products: IProductCreate[]) {
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

  deleteProduct(product: DeleteProductDTO) {
    return this.productsRepository.delete(product);
  }

  updateProduct(product: UpdateProductDTO) {
    return this.productsRepository.update(product.id, product);
  }
}
