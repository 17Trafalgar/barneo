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

  @Column({ type: 'float', nullable: true })
  priceRrc: number;

  @Column({ nullable: true })
  productAilability: string;

  @OneToOne(() => PriceTable, (priceTable: PriceTable) => priceTable.price, {
    cascade: true,
  })
  @JoinColumn()
  price: Relation<PriceTable>;
}
