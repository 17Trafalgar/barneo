import { Injectable } from '@nestjs/common';
import { IProductCreate } from 'src/product/interfaces/product.interface';

@Injectable()
export class mappingService {
  constructor() {}

  public clenConverter(data: any) {
    try {
      const objTitles = {
        Наименование: 'title',
        Артикул: 'article',
        'Артикул произв.': 'articleOfProducer',
        Производитель: 'producer',
        Страна: 'country',
        'Цена без учета скидки, руб.': 'priceListId',
        'Цена с учетом скидок, руб': 'priceRrc',
        Наличие: 'productAilability',
      };

      const newTitle = {};
      const dataFileArray = [];

      for (const obj of data) {
        if (!Object.keys(newTitle).length) {
          for (const key of Object.keys(obj)) {
            if (objTitles[obj[key]]) {
              newTitle[key] = objTitles[obj[key]];
            }
          }
        } else {
          const objData = {};

          for (const key of Object.keys(obj)) {
            if (newTitle[key] == 'article') {
              objData[newTitle[key]] = obj[key].toString();
            } else if (newTitle[key]) {
              objData[newTitle[key]] = obj[key];
            }
          }
          dataFileArray.push(objData);
        }
      }
      return dataFileArray;
    } catch (error) {
      console.log(error);
      throw new Error('The file was not converted');
    }
  }

  public grkConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.Остатки.Номенклатура) {
        dataFileArray.push({
          productCode: obj.Код._text,
          title: obj.Наименование._text,
          article: obj.Артикул._text,
          producer: obj.Бренд._text,
          productAilability: obj.Остаток._text,
          priceList: {
            price: +(obj.Цена._text ?? 0),
            currency: obj.currencyId?._text ?? 'RUB',
            rrc: +(obj.rrc?._text ?? 0),
            rrcValute: +(obj.rrcValute?._text ?? 0),
            valute: +(obj.valute?._text ?? 0),
          },
        });
      }
      console.log(dataFileArray);
      return dataFileArray;
    } catch (error) {
      console.error(error);
      throw new Error('The file was not converted');
    }
  }

  public justCoffeConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        dataFileArray.push({
          productCode: obj.barcode?._text,
          title: obj.name?._text,
          article: obj.categoryId?._text,
          producer: obj.vendor?._text,
          productAilability: obj.quantity?._text,
          priceList: {
            price: obj.price?._text ?? 0,
            currency: obj.currencyId?._text ?? 'RUB',
            rrc: obj.rrc?._text ?? 0,
            rrcValute: obj.rrcValute?._text ?? 0,
            valute: obj.valute?._text ?? 0,
          },
        });
      }
      return dataFileArray;
    } catch (error) {
      console.error(error);
      throw new Error('The file was not converted');
    }
  }

  public async wilmaxConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        dataFileArray.push({
          productCode: obj.barcode?._text,
          title: obj.name?._text,
          article: obj.categoryId?._text,
          producer: obj.vendor?._text,
          productAilability: obj.count?._text,
          priceList: {
            price: obj.price?._text ?? 0,
            currency: obj.currencyId?._text ?? 'RUB',
            rrc: obj.rrc?._text ?? 0,
            rrcValute: obj.rrcValute?._text ?? 0,
            valute: obj.valute?._text ?? 0,
          },
          image: obj.picture?._text,
        });
      }
      return dataFileArray;
    } catch (error) {
      console.error(error);
      throw new Error('The file was not converted');
    }
  }

  public async masterGlassConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        dataFileArray.push({
          productCode: obj.vendorCode?._text,
          title: obj.model?._text,
          article: obj.param[1]?._text,
          producer: obj.vendor?._text,
          productAilability: obj.param[0]?._text,
          priceList: {
            price: obj.price?._text ?? 0,
            currency: obj.currencyId?._text ?? 'RUB',
            rrc: obj.rrc?._text ?? 0,
            rrcValute: obj.rrcValute?._text ?? 0,
            valute: obj.valute?._text ?? 0,
          },
          image: obj.picture?._text,
        });
      }
      return dataFileArray;
    } catch (error) {
      console.error(error);
      throw new Error('The file was not converted');
    }
  }

  public async abatConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        /* console.log(obj); */
        dataFileArray.push({
          productCode: obj.vendorCode?._text,
          title: obj.model?._text,
          article: obj.param[0]?._text,
          producer: obj.vendor?._text,
          productAilability: obj.param[0]?._text,
          priceList: {
            price: obj.price?._text ?? 0,
            currency: obj.currencyId?._text ?? 'RUB',
            rrc: obj.rrc?._text ?? 0,
            rrcValute: obj.rrcValute?._text ?? 0,
            valute: obj.valute?._text ?? 0,
          },
          image: obj.picture?._text,
        });
      }
      return dataFileArray;
    } catch (error) {
      console.error(error);
      throw new Error('The file was not converted');
    }
  }

  public imageConverter(path: string) {
    try {
      const dataImageArray = [];
      dataImageArray.push({
        image: path,
      });
      return dataImageArray;
    } catch (error) {
      console.error(error);
      throw new Error('The image was not converted');
    }
  }
}
