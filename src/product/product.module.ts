import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PriceTable } from './entity/price.entity';
import { Image } from './entity/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, PriceTable, Image])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
