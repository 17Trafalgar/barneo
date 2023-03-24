import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { PriceTable } from '../entity/price.entity';

export class updateProductDTO {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNumber()
  article: string;

  @IsNotEmpty()
  @IsNumber()
  articleOfProducer: string;

  @IsNotEmpty()
  @IsString()
  producer: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  price: PriceTable;

  @IsOptional()
  priceRrc: PriceTable;

  @IsNotEmpty()
  @IsString()
  productAilability: string;
}
