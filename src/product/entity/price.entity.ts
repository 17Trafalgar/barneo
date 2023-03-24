import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Relation,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class PriceTable {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Product, (product) => product.price)
  price: Relation<Product>;

  @Column({ nullable: true })
  priceValute: number;

  @OneToOne(() => Product, (product) => product.priceRrc)
  priceRrc: Relation<Product>; // вынести в другую таблицу и связять  OneToOne // price

  @Column({ type: 'float', nullable: true })
  priceRrcValute: number; // вынести в другую таблицу и связять  OneToOne 'Price table' и туда ещё два поля { price valute, priceRrc Valute} и ещё одно поле "валюта" в сумме - 5// priceRrc

  @Column({ nullable: true })
  valute: number;
}
