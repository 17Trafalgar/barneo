import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  article: number;

  @Column()
  producer: string;

  @Column()
  country: string;

  @Column()
  price: number;

  @Column()
  priceWithoutDiscount: number;

  @Column()
  discountedPrice: number;

  @Column()
  productAilability: string;
}
