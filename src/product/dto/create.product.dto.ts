import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { PriceTable } from '../entity/price.entity';

export class createProductDTO {
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

  @IsOptional()
  priceRrc: number;

  @IsNotEmpty()
  @IsString()
  productAilability: string;

  @IsOptional()
  images?: string[];

  @IsOptional()
  priceList: PriceTable;
}
