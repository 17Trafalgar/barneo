import { IsNotEmpty, IsNumber } from 'class-validator';

export class deleteProductDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
