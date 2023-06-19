import { IsNotEmpty, IsNumber } from 'class-validator';

export class FinndOneParamId {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
