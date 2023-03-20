import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class updateProductDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  article: number;

  @IsNotEmpty()
  @IsString()
  producer: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  priceWithoutDiscount: number;

  @IsNotEmpty()
  @IsNumber()
  discountedPrice: number;

  @IsNotEmpty()
  @IsString()
  productAilability: string;
}
