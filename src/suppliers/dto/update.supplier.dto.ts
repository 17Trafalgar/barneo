import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class updateSupplierDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  typeFile: string;

  @IsNotEmpty()
  @IsString()
  urlFile: string;

  @IsNotEmpty()
  @IsString()
  parser: string;
}
