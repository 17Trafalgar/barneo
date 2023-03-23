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
  priceWithoutDiscount: number;

  @Column({ type: 'float', nullable: true })
  discountedPrice: number;

  @Column({ nullable: true })
  productAilability: string;
}
