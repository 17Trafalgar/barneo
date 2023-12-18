import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateProductDTO } from './dto/update.product.dto';
import { PriceEntity } from './entity/price.entity';
import { IProductCreate } from './interfaces/product.interface';
import { FindOneParamId } from 'src/utils/findOneParam';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
    @InjectRepository(PriceEntity)
    private priceRepository: Repository<PriceEntity>,
  ) {}

  private getChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
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

  async addManyProducts(product: IProductCreate[] | any) {
    const resultArray = [];
    const chunks = this.getChunks(product, 100);
    for (const chunk of chunks) {
      resultArray.push(await this.createProducts(chunk));
    }
    return resultArray;
  }

  delete(id: number): Promise<DeleteResult> {
    return this.productsRepository.delete(id);
  }

  async update(dto: UpdateProductDTO): Promise<ProductEntity> {
    const product = await this.getById(dto.id);
    return this.productsRepository.save({ ...product });
  }
}
