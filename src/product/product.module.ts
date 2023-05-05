import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { productsService } from './product.service';
import { productsController } from './product.controller';
import { PriceTable } from './entity/price.entity';
import { Image } from './entity/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, PriceTable, Image])],
  providers: [productsService],
  controllers: [productsController],
  exports: [productsService],
})
export class productModule {}
