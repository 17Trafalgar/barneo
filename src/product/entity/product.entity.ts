import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'float', nullable: true })
  priceWithoutDiscount: number; // вынести в другую таблицу и связять  OneToOne // price

  @Column({ type: 'float', nullable: true })
  discountedPrice: number; // вынести в другую таблицу и связять  OneToOne 'Price table' и туда ещё два поля { price valute, priceRrc Valute} и ещё одно поле "валюта" в сумме - 5// priceRrc

  @Column({ nullable: true })
  productAilability: string;
}
