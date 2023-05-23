import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteProductDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
