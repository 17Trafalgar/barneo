import { Injectable } from '@nestjs/common';
import { IProductCreate } from 'src/product/interfaces/product.interface';

@Injectable()
export class mappingService {
  constructor() {}

  public clenConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
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
            rrcValute: obj.rrcValute?._text ?? 'RUB',
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
            rrcValute: obj.rrcValute?._text ?? 'RUB',
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
          images: obj.picture?._text,
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
          images: obj.picture?._text,
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
          images: obj.picture?._text,
        });
      }
      return dataFileArray;
    } catch (error) {
      console.error(error);
      throw new Error('The file was not converted');
    }
  }

  public async chttConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        dataFileArray.push({
          productCode: obj.vendorCode?._text,
          title: obj.name?._text,
          article: obj.param[0]?._text,
          producer: obj.vendor?._text,
          productAilability: obj.param[0]?._text,
          priceList: {
            price: obj.RetailPrice?._text ?? 0,
            currency: obj.currencyId?._text ?? 'RUB',
            rrc: obj.rrc?._text ?? 0,
            rrcValute: obj.rrcValute?._text ?? 0,
            valute: obj.valute?._text ?? 0,
          },
          images: obj.picture?._text,
        });
      }
      return dataFileArray;
    } catch (error) {
      console.error(error);
      throw new Error('The file was not converted');
    }
  }

  public redGastroConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (let index = 1; index < data.length; index++) {
        const obj = data[index];
        dataFileArray.push({
          title: obj['Полное наименование'],
          article: obj.Артикул,
          articleOfProducer: obj.Код,
          producer: obj.Бренд,
          country: obj?.__EMPTY_4,
          productAilability: obj.Остаток,
          priceList: {
            price: +(obj['Дилерская (с НДС)'] ?? 0),
            currency: obj?.undefined_0 ?? 'RUB',
            rrc: +(obj['Розничная (с НДС)'] ?? 0),
            rrcValute: obj?.undefined_1 ?? 'RUB',
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

  public async limarsConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        dataFileArray.push({
          title: obj?.name._text,
          country: obj?.param[1]._text,
          productCode: obj?.vendorCode._text,
          articleOfProducer: obj?.code._text,
          article: obj?.barcode._text,
          producer: obj?.param[0]._text,
          productAilability: obj?._attributes.available,
          priceList: {
            price: +(obj?.price[3]._text ?? 0),
            currency: obj?.currencyId._text ?? 'RUB',
            rrc: +(obj?.price[1]._text ?? 0),
            rrcValute: obj?.rrcValute?._text ?? 0,
            valute: obj?.valute._text ?? 0,
          },
          images: obj?.picture._text,
        });
      }
      return dataFileArray; // UTF-8 // price and rrc
    } catch (error) {
      console.error(error);
      throw new Error('The file was not converted');
    }
  }

  public project2015Converter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        dataFileArray.push({
          title: obj?.name['_text'],
          productCode: obj?.vendorCode['_text'],
          article: obj?._attributes.id,
          articleOfProducer: obj?.categoryId['_text'],
          country: obj?.param,
          producer: obj?.collection, //
          productAilability: obj?.quantity, //
          priceList: {
            price: +(obj?.price['_text'] ?? 0),
            currency: obj?.currencyId ?? 'RUB',
            rrc: obj?.priceOpt['_text'] ?? 0, //
            rrcValute: obj?.rrcValute ?? 'RUB',
            valute: +(obj?.valute ?? 0),
          },
          images: obj?.picture ?? 0, //
        });
      }
      return dataFileArray; // utf-8
    } catch (error) {
      console.error(error);
      throw new Error('The file was not converted');
    }
  }

  public restinternationalConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        for (const art of obj.param) {
          if (art._attributes.name === 'Артикул производителя') {
            dataFileArray.push({
              title: obj?.name['_text'],
              productCode: obj?._attributes.externalId,
              article: obj?.vendorCode['_text'],
              articleOfProducer: art._text,
              country: obj?.country_of_origin['_text'],
              producer: obj?.vendor['_text'],
              productAilability: obj?.stock_quantity['_text'],
              priceList: {
                price: +(obj?.price['_text'] ?? 0),
                currency: obj?.currencyId['_text'] ?? 'RUB',
                rrc: obj?.rrc,
                rrcValute: obj?.rrcValute,
                valute: obj?.valute,
              },
              images: obj?.picture,
            });
          }
        }
      }
      return dataFileArray; // utf-8
    } catch (error) {
      console.error(error);
      throw new Error('The file was not converted');
    }
  }

  public imageConverter(path: string) {
    try {
      const dataImageArray = [];
      dataImageArray.push({
        images: path,
      });
      return dataImageArray;
    } catch (error) {
      console.error(error);
      throw new Error('The image was not converted');
    }
  }
}
