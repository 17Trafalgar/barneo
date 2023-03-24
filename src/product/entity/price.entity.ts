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

  @Column({ type: 'float', nullable: true })
  priceValute: number;

  @Column({ type: 'float', nullable: true })
  priceRrc: number;

  @Column({ type: 'float', nullable: true })
  priceRrcValute: number;

  @Column({ type: 'float', nullable: true })
  valute: number;

  @OneToOne(() => Product, (product: Product) => product.price)
  price: Relation<Product>;
}
