import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetSupplierDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
