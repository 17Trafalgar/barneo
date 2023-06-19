import { IsString, IsNumber, IsOptional } from 'class-validator';
import { PriceTable } from '../entity/price.entity';
import { Image } from '../entity/images.entity';

export class UpdateProductDTO {
  @IsNumber()
  id: number;

  @IsString()
  title?: string;

  @IsString()
  article?: string;

  @IsString()
  productCode?: string;

  @IsString()
  articleOfProducer?: string;

  @IsString()
  producer?: string;

  @IsString()
  country?: string;

  @IsString()
  productAilability?: string;

  @IsOptional()
  images?: Image[];

  @IsOptional()
  priceList?: PriceTable;
}
