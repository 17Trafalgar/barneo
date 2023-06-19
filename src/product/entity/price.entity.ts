import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class PriceTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', nullable: true })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  currency: string;

  @Column({ type: 'numeric', nullable: true })
  rrc: number;

  @Column({ type: 'varchar', nullable: true })
  rrcValute: string;

  @Column({ type: 'numeric', nullable: true })
  valute: number;

  @OneToOne(() => Product, (product: Product) => product.priceList)
  product: Product;
}
