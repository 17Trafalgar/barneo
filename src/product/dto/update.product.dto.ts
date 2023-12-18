import { IsString, IsNumber, IsOptional } from 'class-validator';
import { PriceEntity } from '../entity/price.entity';
import { ImageEntity } from '../entity/images.entity';

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
  images?: ImageEntity[];

  @IsOptional()
  priceList?: PriceEntity;
}
