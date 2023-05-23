import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetProductDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
