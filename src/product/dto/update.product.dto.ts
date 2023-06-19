import { IsString, IsNumber, IsOptional } from 'class-validator';
import { PriceTable } from '../entity/price.entity';
import { Image } from '../entity/images.entity';

export class UpdateProductDTO {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  article?: string;

  @IsOptional()
  @IsString()
  productCode?: string;

  @IsOptional()
  @IsString()
  articleOfProducer?: string;

  @IsOptional()
  @IsString()
  producer?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  productAilability?: string;

  @IsOptional()
  images?: Image[];

  @IsOptional()
  priceList?: PriceTable;
}
