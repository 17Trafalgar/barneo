import { IsString, IsOptional } from 'class-validator';
import { StorageEntity } from '../entity/storage.entity';

export class CreateSupplierDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  typeFile?: string;

  @IsOptional()
  @IsString()
  urlFile?: string;

  @IsOptional()
  @IsString()
  parser?: string;

  @IsOptional()
  @IsString()
  encoding?: string;

  @IsOptional()
  storage?: StorageEntity[];
}
