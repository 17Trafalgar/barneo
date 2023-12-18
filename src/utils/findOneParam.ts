import { IsNumber } from 'class-validator';

export class FindOneParamId {
  @IsNumber()
  id: number;
}
