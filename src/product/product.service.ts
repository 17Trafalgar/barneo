import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UpdateProductDTO } from './dto/update.product.dto';
import { PriceEntity } from './entity/price.entity';
import { IProductCreate } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
    @InjectRepository(PriceEntity)
    private priceRepository: Repository<PriceEntity>,
  ) {}

  private getChunks(arr, chunkSize) {
    const response = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      response.push(chunk);
    }
    return response;
  }

  getById(id: number): Promise<ProductEntity> {
    return this.productsRepository.findOne({
      where: { id },
      relations: { images: true, priceList: true },
    });
  }

  getAll(): Promise<ProductEntity[]> {
    return this.productsRepository.find({
      relations: { images: true, priceList: true },
    });
  }

  createPrice(price: Partial<PriceEntity>): Promise<PriceEntity> {
    return this.priceRepository.save(price);
  }

  create(product: IProductCreate): Promise<IProductCreate> {
    return this.productsRepository.save(product);
  }

  createProducts(products: IProductCreate[]): Promise<IProductCreate[]> {
    return this.productsRepository.save(products);
  }

  async addManyProducts(product: IProductCreate[]): Promise<IProductCreate[]> {
    const products = [];
    const chunks = this.getChunks(product, 100);
    for (const chunk of chunks) {
      products.push(await this.createProducts(chunk));
    }
    return products;
  }

  delete(id: number): Promise<DeleteResult> {
    return this.productsRepository.delete(id);
  }

  async update(dto: UpdateProductDTO): Promise<ProductEntity> {
    const product = await this.getById(dto.id);
    return this.productsRepository.save({ ...product });
  }
}
