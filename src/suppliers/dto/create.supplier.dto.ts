import { IsString, IsNotEmpty } from 'class-validator';

export class createSupplierDTO {
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
