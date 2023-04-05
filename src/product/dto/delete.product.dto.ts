import { IsNumber, IsNotEmpty } from 'class-validator';

export class deleteProductDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
