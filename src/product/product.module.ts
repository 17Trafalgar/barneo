import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PriceEntity } from './entity/price.entity';
import { Image } from './entity/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, PriceEntity, Image])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
