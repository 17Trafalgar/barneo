import { IsNumber } from 'class-validator';

class FindOneParamId {
  @IsNumber()
  id: number;
}

export default FindOneParamId;
