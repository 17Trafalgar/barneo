import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductsService } from './product.service';
import { ProductsController } from './product.controller';
import { PriceTable } from './entity/price.entity';
import { Image } from './entity/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, PriceTable, Image])],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductModule {}
