import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { PriceEntity } from '../entity/price.entity';
import { Image } from '../entity/images.entity';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  article: string;

  @IsNotEmpty()
  @IsString()
  productCode: string;

  @IsNotEmpty()
  @IsString()
  articleOfProducer: string;

  @IsNotEmpty()
  @IsString()
  producer: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  productAilability: string;

  @IsOptional()
  images: Image[];

  @IsOptional()
  priceList: PriceEntity;
}
