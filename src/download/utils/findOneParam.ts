import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindOneParamId {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
