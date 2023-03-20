import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class createProductDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNumber()
  article: number;

  @IsNotEmpty()
  @IsString()
  producer: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNumber()
  price: number;

  @IsNumber()
  priceWithoutDiscount: number;

  @IsNumber()
  discountedPrice: number;

  @IsNotEmpty()
  @IsString()
  productAilability: string;
}
