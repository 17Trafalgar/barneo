import { IsNotEmpty, IsNumber } from 'class-validator';

export class getProductDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
