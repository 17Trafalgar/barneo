import { IPriceCreate } from './price.interface';

export interface IProductCreate {
  title?: string;
  article?: string;
  productCode?: string;
  articleOfProducer?: string;
  producer?: string;
  country?: string;
  priceRrc?: number;
  productAilability?: string;
  images?: string[];
  priceList: IPriceCreate;
}
