import { Injectable } from '@nestjs/common';

@Injectable()
export class MappingService {
  constructor() {}

  public async xlsxConverter(data: any): Promise<any> {
    try {
      const keys = Object.keys(data);
      keys.forEach((key) => {
        return key;
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
