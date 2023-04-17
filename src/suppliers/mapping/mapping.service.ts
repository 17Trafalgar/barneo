import { Injectable } from '@nestjs/common';
import { IProductCreate } from 'src/product/interfaces/product.interface';

@Injectable()
export class mappingService {
  constructor() {}

  public clenConverter(data: any) {
    try {
      const dataFileArray = [];
      for (let index = 6; index < data.length; index++) {
        const obj = data[index];
        dataFileArray.push({
          title: obj.КомплексБар,
          article: obj.__EMPTY,
          articleOfProducer: obj.__EMPTY_1,
          producer: obj.__EMPTY_2,
          country: obj.__EMPTY_4,
          productAilability: obj.__EMPTY_9,
          priceList: {
            price: +(obj.__EMPTY_6 ?? 0),
            currency: obj.currencyId?._text ?? 'RUB',
            rrc: +(obj.__EMPTY_7 ?? 0),
            rrcValute: +(obj.rrcValute?._text ?? 0),
            valute: +(obj.valute?._text ?? 0),
          },
        });
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
