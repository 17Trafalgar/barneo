import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Storages } from '../entity/storage.entity';

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

  @IsOptional()
  storage?: Storages[];
}
