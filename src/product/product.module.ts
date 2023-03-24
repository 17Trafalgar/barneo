import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { productsService } from './product.service';
import { productsController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [productsService],
  controllers: [productsController],
  exports: [productsService],
})
export class productModule {}
