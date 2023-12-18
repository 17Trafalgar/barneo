import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PriceEntity } from './entity/price.entity';
import { ImageEntity } from './entity/images.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, PriceEntity, ImageEntity]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
