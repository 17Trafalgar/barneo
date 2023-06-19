import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateProductDTO } from './dto/update.product.dto';
import { PriceTable } from './entity/price.entity';
import { IProductCreate } from './interfaces/product.interface';
import { FindOneParamId } from 'src/download/utils/findOneParam';

@Injectable()
export class ProductService {
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

  async getProductById(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { images: true, priceList: true },
    });
    if (!product) {
      throw new BadRequestException('Product with this ID was not found');
    }
    return product;
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productsRepository.find({
      relations: { images: true, priceList: true },
    });
    if (!products) {
      throw new BadRequestException('There are no products in the database :(');
    }
    return products;
  }

  async addPrice(price: Partial<PriceTable>): Promise<PriceTable> {
    const priceForProduct = await this.priceRepository.save(price);
    return priceForProduct;
  }

  async addProduct(product: IProductCreate): Promise<IProductCreate> {
    const newProduct = await this.productsRepository.save(product);
    if (!newProduct) {
      throw new BadRequestException('Failed to create a product');
    }
    return newProduct;
  }

  async addProducts(products: IProductCreate[]): Promise<IProductCreate[]> {
    const newProducts = await this.productsRepository.save(products);
    if (!newProducts) {
      throw new BadRequestException('Failed to create a products');
    }
    return newProducts;
  }

  async addManyProducts(product: IProductCreate[] | any) {
    const resultArray = [];
    const chunks = this.getChunks(product, 100);
    for (const chunk of chunks) {
      resultArray.push(await this.addProducts(chunk));
    }
    return resultArray;
  }

  async deleteProduct(productId: FindOneParamId): Promise<DeleteResult> {
    const product = await this.getProductById(productId.id);
    if (!product) {
      throw new BadRequestException('Could not find product');
    }
    return this.productsRepository.delete(productId);
  }

  async updateProduct(product: UpdateProductDTO): Promise<UpdateResult> {
    const productForUpdating = await this.getProductById(product.id);
    if (!productForUpdating) {
      throw new BadRequestException('Could not find product');
    }
    const updating = await this.productsRepository.update(product.id, product);
    if (!updating) {
      throw new BadRequestException('Failed to update product');
    }
    return updating;
  }
}
