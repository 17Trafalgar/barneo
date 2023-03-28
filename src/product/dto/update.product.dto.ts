import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { PriceTable } from '../entity/price.entity';

export class updateProductDTO {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  article: number;

  @IsOptional()
  productCode: number;

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
  priceRrc: number;

  @IsNotEmpty()
  @IsString()
  productAilability: string;

  @IsOptional()
  priceList: PriceTable;
}
