import { IsNotEmpty, IsNumber } from 'class-validator';

export class deleteSupplierDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
