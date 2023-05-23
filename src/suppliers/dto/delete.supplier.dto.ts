import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteSupplierDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
