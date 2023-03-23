import { IsNumber } from 'class-validator';

export class deleteProductDTO {
  @IsNumber()
  id: number;
}
