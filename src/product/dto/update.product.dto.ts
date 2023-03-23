import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

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

  @IsNumber()
  priceWithoutDiscount: number;

  @IsNumber()
  discountedPrice: number;

  @IsNotEmpty()
  @IsString()
  productAilability: string;
}
