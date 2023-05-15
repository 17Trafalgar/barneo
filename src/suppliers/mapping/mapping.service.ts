import { Injectable } from '@nestjs/common';
import { IProductCreate } from 'src/product/interfaces/product.interface';

@Injectable()
export class mappingService {
  constructor() {}

  public clenConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (let index = 6; index < data['Прайс-лист'].length; index++) {
        const obj = data['Прайс-лист'][index];
        dataFileArray.push({
          title: obj.КомплексБар ?? '-',
          productCode: '-',
          article: obj.__EMPTY ?? '-',
          articleOfProducer: obj.__EMPTY_1 ?? '-',
          producer: obj.__EMPTY_2 ?? '-',
          country: obj.__EMPTY_4 ?? '-',
          productAilability: obj.__EMPTY_9 ?? '-',
          priceList: {
            price: +(obj.__EMPTY_6 ?? 0) ?? 0,
            currency: obj.currencyId?._text ?? 'RUB',
            rrc: +(obj.__EMPTY_7 ?? 0) ?? 0,
            rrcValute: obj.rrcValute?._text ?? 'RUB',
            valute: +(obj.valute?._text ?? 0) ?? 0,
          },
        });
      }
      return dataFileArray;
    } catch (error) {
      console.log(error);
      throw new Error('The file of Clen was not converted');
    }
  }

  public grkConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.Остатки.Номенклатура) {
        dataFileArray.push({
          title: obj.Наименование._text ?? '-',
          productCode: obj.Код._text ?? '-',
          article: obj.Артикул._text ?? '-',
          articleOfProducer: '-',
          producer: obj.Бренд._text ?? '-',
          country: '-',
          productAilability: obj.Остаток._text ?? '-',
          priceList: {
            price: +(obj.Цена._text ?? 0) ?? 0,
            currency: obj.currencyId?._text ?? 'RUB',
            rrc: +(obj.rrc?._text ?? 0) ?? 0,
            rrcValute: obj.rrcValute?._text ?? 'RUB',
            valute: +(obj.valute?._text ?? 0) ?? 0,
          },
        });
      }
      return dataFileArray; // utf-8
    } catch (error) {
      console.error(error);
      throw new Error('The file of grk was not converted');
    }
  }

  public justCoffeeConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        const images = [];
        if (obj?.picture?._text) {
          images.push({ url: obj.picture._text });
        }
        dataFileArray.push({
          title: obj.name?._text ?? '-',
          productCode: obj._attributes?.id ?? '-',
          article: obj.categoryId?._text ?? '-',
          articleOfProducer: obj._attributes?.group_id ?? '-',
          producer: obj.vendor?._text ?? '-',
          country: '-',
          productAilability: obj.count?._text ?? '-',
          priceList: {
            price: obj.price?._text ?? 0,
            currency: obj.currencyId?._text ?? 'RUB',
            rrc: obj.rrc?._text ?? 0,
            rrcValute: obj.rrcValute?._text ?? 'RUB',
            valute: obj.valute?._text ?? 0,
          },
          images,
        });
      }
      return dataFileArray; // windows - 1251
    } catch (error) {
      console.error(error);
      throw new Error('The file of JustCoffe was not converted');
    }
  }

  public async wilmaxConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        const images = [];
        if (obj?.picture?._text) {
          images.push({ url: obj.picture._text });
        }
        dataFileArray.push({
          title: obj.name?._text ?? '-',
          productCode: obj.barcode?._text ?? '-',
          article: obj.categoryId?._text ?? '-',
          articleOfProducer: '-',
          producer: obj.vendor?._text ?? '-',
          country: '-',
          productAilability: obj.count?._text ?? '-',
          priceList: {
            price: obj.price?._text ?? 0,
            currency: obj.currencyId?._text ?? 'RUB',
            rrc: obj.rrc?._text ?? 0,
            rrcValute: obj.rrcValute?._text ?? 'RUB',
            valute: obj.valute?._text ?? 0,
          },
          images,
        });
      }
      return dataFileArray; // utf-8
    } catch (error) {
      console.error(error);
      throw new Error('The file of Wlimax was not converted');
    }
  }

  public async masterGlassConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        const images = [];
        if (obj?.picture?._text) {
          images.push({ url: obj.picture._text });
        }
        dataFileArray.push({
          title: obj.model?._text ?? '-',
          productCode: obj.vendorCode?._text ?? '-',
          article: obj.param[1]?._text ?? '-',
          articleOfProducer: '-',
          producer: obj.vendor?._text ?? '-',
          country: '-',
          productAilability: obj.param[0]?._text ?? '-',
          priceList: {
            price: obj.price?._text ?? 0,
            currency: obj.currencyId?._text ?? 'RUB',
            rrc: obj.rrc?._text ?? 0,
            rrcValute: obj.rrcValute?._text ?? 'RUB',
            valute: obj.valute?._text ?? 0,
          },
          images,
        });
      }
      return dataFileArray; // utf-8
    } catch (error) {
      console.error(error);
      throw new Error('The file of MasterGlass was not converted');
    }
  }

  public async abatConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        const images = [];
        if (obj?.picture?._text) {
          images.push({ url: obj.picture._text });
        }
        dataFileArray.push({
          title: obj.model?._text,
          productCode: obj.vendorCode?._text ?? '-',
          article: obj.param[0]?._text ?? '-',
          articleOfProducer: '-',
          producer: obj.vendor?._text ?? '-',
          country: '-',
          productAilability: obj.param[0]?._text ?? '-',
          priceList: {
            price: obj.price?._text ?? 0,
            currency: obj.currencyId?._text ?? 'RUB',
            rrc: obj.rrc?._text ?? 0,
            rrcValute: obj.rrcValute?._text ?? 'RUB',
            valute: obj.valute?._text ?? 0,
          },
          images,
        });
      }
      return dataFileArray; // utf-8
    } catch (error) {
      console.error(error);
      throw new Error('The file of Abat was not converted');
    }
  }

  public async chttConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        const images = [];
        if (obj?.picture?._text) {
          images.push({ url: obj.picture._text });
        }
        dataFileArray.push({
          title: obj.name?._text ?? '-',
          productCode: obj.vendorCode?._text ?? '-',
          article: obj.param[0]?._text ?? '-',
          articleOfProducer: '-',
          producer: obj.vendor?._text ?? '-',
          country: '-',
          productAilability: obj.param[0]?._text ?? '-',
          priceList: {
            price: obj.RetailPrice?._text ?? 0,
            currency: obj.currencyId?._text ?? 'RUB',
            rrc: obj.rrc?._text ?? 0,
            rrcValute: obj.rrcValute?._text ?? 'RUB',
            valute: obj.valute?._text ?? 0,
          },
          images,
        });
      }
      return dataFileArray; // windwiws -1251
    } catch (error) {
      console.error(error);
      throw new Error('The file of Chtt was not converted');
    }
  }

  public redGastroConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (let index = 1; index < data['TDSheet'].length; index++) {
        const obj = data['TDSheet'][index];
        dataFileArray.push({
          title: obj['Полное наименование'] ?? '-',
          productCode: '-',
          article: obj.Артикул ?? '-',
          articleOfProducer: obj.Код ?? '-',
          producer: obj.Бренд ?? '-',
          country: obj?.__EMPTY_4 ?? '-',
          productAilability: obj.Остаток ?? '-',
          priceList: {
            price: +(obj['Дилерская (с НДС)'] ?? 0),
            currency: obj?.undefined_0 ?? 'RUB',
            rrc: +(obj['Розничная (с НДС)'] ?? 0),
            rrcValute: obj?.undefined_1 ?? 'RUB',
            valute: +(obj.valute?._text ?? 0),
          },
        });
      }
      return dataFileArray; // 'TDSheet'
    } catch (error) {
      console.log(error);
      throw new Error('The file of RedGastros was not converted');
    }
  }

  public async limarsConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        for (const attribute of obj.param) {
          if (attribute._attributes.name === 'Страны производители') {
            for (const ailability of obj.param) {
              if (ailability._attributes.name === 'Остаток Электросталь') {
                dataFileArray.push({
                  title: obj?.name['_text'] ?? '-',
                  country: attribute?._text ?? '-',
                  productCode: obj?._attributes['id'] ?? '-',
                  articleOfProducer: obj?.code['_text'] ?? '-',
                  article: '-',
                  producer: obj?.vendor['_text'] ?? '-',
                  productAilability: ailability?._text, // три склада, складыват их и делать из поля number тип
                  priceList: {
                    price: +obj.price?._attributes ?? 0, //
                    currency: obj?.currencyId['_text'] ?? 'RUB',
                    rrc: 0,
                    rrcValute: '0',
                    valute: 0,
                  },
                });
              }
            }
          }
        }
      }
      return dataFileArray; // UTF-8
    } catch (error) {
      console.error(error);
      throw new Error('The file of Limars was not converted');
    }
  }

  public project2015Converter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        if (obj.quantity) {
          if (obj.param) {
            for (const attribute of obj.param) {
              if (attribute._attributes.name === 'Страна производитель') {
                const images = [];
                if (obj?.picture?._text) {
                  images.push({ url: obj.picture._text });
                }
                dataFileArray.push({
                  title: obj?.name['_text'] ?? '-',
                  productCode: obj?.categoryId['_text'] ?? '-',
                  article: obj?._attributes.id ?? '-',
                  articleOfProducer: obj?.vendorCode['_text'] ?? '-',
                  country: attribute?._text ?? '-',
                  producer: obj?.vendor._text ?? '-',
                  productAilability: obj?.quantity['_text'] ?? '-',
                  priceList: {
                    price: +obj?.price['_text'] ?? 0,
                    currency: obj?.currencyId ?? 'RUB',
                    rrc: +obj?.priceOpt['_text'] ?? 0,
                    rrcValute: obj?.rrcValute ?? 'RUB',
                    valute: obj?.valute ?? 0,
                  },
                  images,
                });
              }
            }
          }
        }
      }
      return dataFileArray; // utf-8
    } catch (error) {
      console.error(error);
      throw new Error('The file of Project2015 was not converted');
    }
  }

  public restinternationalConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        for (const attribute of obj.param) {
          if (attribute._attributes.name === 'Артикул производителя') {
            const images = [];
            if (obj?.picture?._text) {
              images.push({ url: obj.picture['_text'] });
            }
            dataFileArray.push({
              title: obj?.name['_text'] ?? '-',
              productCode: obj?._attributes.externalId ?? '-',
              article: obj?.vendorCode['_text'] ?? '-',
              articleOfProducer: attribute?._text ?? '-',
              country: obj?.country_of_origin['_text'] ?? '-',
              producer: obj?.vendor['_text'] ?? '-',
              productAilability: obj?.stock_quantity['_text'] ?? '-',
              priceList: {
                price: +(obj?.price['_text'] ?? 0),
                currency: obj?.currencyId['_text'] ?? 'RUB',
                rrc: obj?.rrc ?? 0,
                rrcValute: obj?.rrcValute ?? 'RUB',
                valute: obj?.valute ?? 0,
              },
              images,
            });
          }
        }
      }
      return dataFileArray; // utf-8
    } catch (error) {
      console.error(error);
      throw new Error('The file of restinternational was not converted');
    }
  }

  public hicoldConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      let productData: any = { priceList: {} };
      let isStart = false;

      for (const key in data.Sheets.TDSheet) {
        if (!key) {
          continue;
        }
        if (key === 'A5') {
          isStart = true;
        }
        if (isStart) {
          if (key[0] === 'A') {
            productData.article = data.Sheets.TDSheet[key].v;
          }
          if (key[0] === 'B') {
            productData.title = data.Sheets.TDSheet[key].v;
          }
          if (key[0] === 'F') {
            productData.priceList.price = data.Sheets.TDSheet[key].v;
            dataFileArray.push(productData);
            productData = { priceList: {} };
          }
        }
        if (key === 'F3818') {
          isStart = false;
        }
      }
      return dataFileArray; // hasmap для одного парсера
    } catch (error) {
      console.log(error);
      throw new Error('The file of HICOLD was not converted');
    }
  }

  public businessRusConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.PriceByAgreements.Products.Product) {
        if (obj.WarehousesPrices.PurchasePrice.Price) {
          if (obj.WarehousesPrices.RetailPrice.Price) {
            const images = [];
            if (obj?.ImgUrls?.ImgUrl['_text']) {
              images.push({ url: obj?.ImgUrls?.ImgUrl['_text'] });
            }
            dataFileArray.push({
              title: obj?.Name['_text'] ?? '-',
              productCode: obj?.Code['_text'] ?? '-',
              article: obj?.ParentCode['_text'] ?? '-',
              articleOfProducer: obj?.SupplierCode['_text'] ?? '-',
              country: obj?.Country['_text'] ?? '-',
              producer: obj?.Brend['_text'] ?? '-',
              productAilability: '-', //
              priceList: {
                price: obj?.WarehousesPrices.RetailPrice.Price['_text'] ?? 0,
                currency: obj?.CurrencyPrice['_text'] ?? '-',
                rrc:
                  obj?.WarehousesPrices.PurchasePrice.Price['_text'] ?? 'RUB',
                rrcValute: obj?.Currency['_text'] ?? '-',
                valute: 0,
              },
              images,
            });
          }
        }
      }
      return dataFileArray; // utf-8
    } catch (error) {
      console.log(error);
      throw new Error('The file of businessRus was not converted');
    }
  }

  public restoinoxConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        const images = [];
        if (obj?.picture['_text']) {
          images.push({ url: obj?.picture['_text'] });
        }
        dataFileArray.push({
          title: obj?.model['_text'] ?? '-',
          productCode: obj?.vendorCode['_text'] ?? '-',
          article: '-',
          articleOfProducer: obj?._attributes['id'] ?? '-',
          country: '-',
          producer: obj?.vendor['_text'] ?? '-',
          productAilability: '-',
          priceList: {
            price: obj?.price['_text'] ?? 0,
            currency: obj?.currencyId['_text'] ?? 'RUB',
            rrc: 0,
            rrcValute: 'RUB',
            valute: 0,
          },
          images,
        });
      }
      return dataFileArray; // utf-8
    } catch (error) {
      console.log(error);
      throw new Error('The file restoinox was not converted');
    }
  }

  public atesiConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (let index = 5; index < data['TDSheet'].length; index++) {
        const obj = data['TDSheet'][index];
        if (obj.__EMPTY_3) {
          dataFileArray.push({
            title: obj?.__EMPTY_3 ?? '-',
            productCode: obj?.__EMPTY ?? '-',
            article: '-',
            articleOfProducer: '-',
            country: '-',
            producer: '-',
            productAilability: '-',
            priceList: {
              price: obj?.__EMPTY_6 ?? 0,
              currency: 'RUB',
              rrc: obj?.__EMPTY_7 ?? 0,
              rrcValute: '0',
              valute: 0,
            },
          });
        }
      }
      return dataFileArray;
    } catch (error) {
      console.log(error);
      throw new Error('The file of Atesi was not converted');
    }
  }

  public sabotageDesignConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      const sheet = {
        Оборудование: 'Оборудование',
        Посуда: 'Посуда',
        Кухня: 'Для кухни',
        'Для суши-бара': 'Для суши-бара',
        Ножи: 'Ножи',
        Униформа: 'Униформа',
        ПодаркиСувенир: 'ПодаркиСувенир',
        NEW: 'NEW',
        Sale: 'Sale',
      };
      for (const key in data) {
        if (key == sheet[key]) {
          for (let index = 1; index < data[sheet[key]].length; index++) {
            const obj = data[sheet[key]][index];
            if (obj.__EMPTY_1) {
              dataFileArray.push({
                title: obj?.__EMPTY_1 ?? '-',
                productCode: obj?.__EMPTY ?? '-',
                article: obj?.__EMPTY_3 ?? '-',
                articleOfProducer: '-',
                country: '-',
                producer: '-',
                productAilability: '-',
                priceList: {
                  price: +obj?.__EMPTY_8 ?? 0,
                  currency: 'RUB',
                  rrc: 0,
                  rrcValute: 'RUB',
                  valute: 0,
                },
              });
            }
          }
        }
      }
      return dataFileArray; // нету названия книги
    } catch (error) {
      console.log(error);
      throw new Error('The file of Sabotage Design was not converted');
    }
  }

  public dobrinMskConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        const images = [];
        if (obj?.picture) {
          for (const value of Object.values(obj.picture)) {
            if (value['_text']) {
              images.push({ url: value['_text'] });
            } else {
              images.push({ url: value });
            }
          }
        }
        dataFileArray.push({
          title: obj?.name['_text'] ?? '-',
          productCode: obj?.barcode['_text'] ?? '-',
          article: obj?.param[1]['_text'] ?? '-',
          articleOfProducer: obj?.vendorCode['_text'] ?? '-',
          country: obj?.country_of_origin['_text'] ?? '-',
          producer: obj?.vendor['_text'] ?? '-',
          productAilability: obj?.stock['_text'] ?? '-',
          priceList: {
            price: obj?.price['_text'] ?? 0,
            currency: obj?.currencyId['_text'] ?? 'RUB',
            rrc: 0,
            rrcValute: 'RUB',
            valute: 0,
          },
          images,
        });
      }
      return dataFileArray; // utf-8
    } catch (error) {
      console.log(error);
      throw new Error('The file of DobrinMSK was not converted');
    }
  }

  public dobrinSpbConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (const obj of data.yml_catalog.shop.offers.offer) {
        const images = [];
        if (obj?.picture) {
          for (const value of Object.values(obj.picture)) {
            if (value['_text']) {
              images.push({ url: value['_text'] });
            } else {
              images.push({ url: value });
            }
          }
        }
        dataFileArray.push({
          title: obj?.name['_text'] ?? '-',
          productCode: obj?.barcode['_text'] ?? '-',
          article: obj?.param[1]['_text'] ?? '-',
          articleOfProducer: obj?.vendorCode['_text'] ?? '-',
          country: obj?.country_of_origin['_text'] ?? '-',
          producer: obj?.vendor['_text'] ?? '-',
          productAilability: obj?.stock['_text'] ?? '-',
          priceList: {
            price: obj?.price['_text'] ?? 0,
            currency: obj?.currencyId['_text'] ?? 'RUB',
            rrc: 0,
            rrcValute: 'RUB',
            valute: 0,
          },
          images,
        });
      }
      return dataFileArray; // utf-8
    } catch (error) {
      console.log(error);
      throw new Error('The file of DobrinSPB was not converted');
    }
  }

  public complexBar(data1: any, data2: any) {
    try {
      const dataFile: { [key: string]: IProductCreate } = {};
      for (const obj of data1.items) {
        dataFile[obj.id_product] = {
          title: '0' ?? '-',
          productCode: '0' ?? '-',
          article: obj?.article_number_product ?? '-',
          articleOfProducer: obj?.id_product ?? '-',
          country: '0' ?? '-',
          producer: '0' ?? '-',
          productAilability: obj?.count ?? '-',
          priceList: {
            price: 0,
            currency: 'RUB',
            rrc: 0,
            rrcValute: 'RUB',
            valute: 0,
          },
        };
      }
      for (const obj2 of data2.items) {
        if (dataFile[obj2.id_product]) {
          dataFile[obj2.id_product].priceList.price = obj2.price;
        }
      }
      return Object.values(dataFile);
    } catch (error) {
      console.log(error);
      throw new Error('The file of Complex Bar was not converted');
    }
  }

  public amenariConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      const sheet = {
        S30S20S15: 'S30S20S15',
        'M200 + Elective': 'M200 + Elective',
        'M23 + CM OD': 'M23 + CM OD',
      };
      for (const key in data) {
        if (key == sheet[key]) {
          for (let index = 2; index < data[sheet[key]].length; index++) {
            const obj = data[sheet[key]][index];
            if (obj['Курс']) {
              if (!isNaN(obj['Курс'])) {
                dataFileArray.push({
                  title: obj?.__EMPTY ?? '-',
                  productCode: '-',
                  article: '-',
                  articleOfProducer: '-',
                  country: '-',
                  producer: '-',
                  productAilability: '-',
                  priceList: {
                    price: +obj['20%'] ?? 0,
                    currency: 'RUB',
                    rrc: +obj['90.00 ₽'] ?? 0,
                    rrcValute: '€',
                    valute: +obj['Курс'] ?? 0,
                  },
                });
              }
            }
          }
        }
      }
      return dataFileArray;
    } catch (error) {
      console.log(error);
      throw new Error('The file of AMENARI was not converted');
    }
  }

  public vseSokiConverter(data: any) {
    try {
      const dataFileArray: IProductCreate[] = [];
      for (let index = 5; index < data['Прайс-лист ОПТ'].length; index++) {
        const obj = data['Прайс-лист ОПТ'][index];
        dataFileArray.push({
          title: obj?.__EMPTY_2 ?? '-',
          productCode: obj?.__EMPTY_42 ?? '-',
          article: obj?.__EMPTY ?? '-',
          articleOfProducer: obj?.__EMPTY_39 ?? '-',
          country: obj?.__EMPTY_26 ?? '-',
          producer: obj?.__EMPTY_38 ?? '-',
          productAilability: obj?.__EMPTY_29 ?? '-',
          priceList: {
            price: +obj.__EMPTY_4 ?? 0,
            currency: 'RUB',
            rrc: +obj.__EMPTY_12 ?? 0,
            rrcValute: 'RUB',
            valute: 0,
          },
        });
      }
      return dataFileArray;
    } catch (error) {
      console.log(error);
      throw new Error('The file of vseSoki was not converted');
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
