import { IsNotEmpty, IsNumber } from 'class-validator';

export class getSupplierDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
