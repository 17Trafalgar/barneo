import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class PriceTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', nullable: true })
  price: number;

  @Column({ type: 'numeric', nullable: true })
  priceValute: number;

  @Column({ type: 'numeric', nullable: true })
  priceRrc: number;

  @Column({ type: 'numeric', nullable: true })
  priceRrcValute: number;

  @Column({ type: 'numeric', nullable: true })
  valute: number;

  @OneToOne(() => Product, (product: Product) => product.priceList)
  priceProduct: Product;
}
