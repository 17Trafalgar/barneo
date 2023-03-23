import { Injectable } from '@nestjs/common';

@Injectable()
export class MappingService {
  constructor() {}

  public async xlsxConverter(data: any): Promise<any> {
    try {
      const objTitles = {
        Наименование: 'title',
        Артикул: 'article',
        'Артикул произв.': 'articleOfProducer',
        Производитель: 'producer',
        Страна: 'country',
        'Цена без учета скидки, руб.': 'priceWithoutDiscount',
        'Цена с учетом скидок, руб': 'discountedPrice',
        Наличие: 'productAilability',
      };

      const hasmap = {};
      const dataFileArray = [];

      for (const obj of data) {
        if (!Object.keys(hasmap).length) {
          for (const key of Object.keys(obj)) {
            if (objTitles[obj[key]]) {
              hasmap[key] = objTitles[obj[key]];
            }
          }
        } else {
          const objData = {};

          for (const key of Object.keys(obj)) {
            if (hasmap[key] == 'article') {
              objData[hasmap[key]] = obj[key].toString();
            } else if (hasmap[key]) {
              objData[hasmap[key]] = obj[key];
            }
          }
          dataFileArray.push(objData);
        }
      }
      return dataFileArray;
    } catch (error) {
      throw new Error(error);
    }
  }
}
