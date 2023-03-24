import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { PriceTable } from './price.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  article: string;

  @Column({ nullable: true })
  articleOfProducer: string;

  @Column({ nullable: true })
  producer: string;

  @Column({ nullable: true })
  country: string;

  @OneToOne(() => PriceTable, (priceTable) => priceTable.price)
  @JoinColumn()
  price: Relation<PriceTable>; // вынести в другую таблицу и связять  OneToOne // price

  @OneToOne(() => PriceTable, (priceTable) => priceTable.priceRrc)
  @JoinColumn()
  priceRrc: Relation<PriceTable>; // вынести в другую таблицу и связять  OneToOne 'Price table' и туда ещё два поля { price valute, priceRrc Valute} и ещё одно поле "валюта" в сумме - 5// priceRrc

  @Column({ nullable: true })
  productAilability: string;
}
