import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PriceTable } from './price.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  article?: string;

  @Column({ nullable: true })
  productCode?: string;

  @Column({ nullable: true })
  articleOfProducer?: string;

  @Column({ nullable: true })
  producer?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ type: 'numeric', nullable: true })
  priceRrc?: number;

  @Column({ nullable: true })
  productAilability?: string;

  @Column({ type: 'simple-array', nullable: true })
  image?: string[];

  @OneToOne(() => PriceTable, (priceTable: PriceTable) => priceTable.product, {
    cascade: true,
  })
  @JoinColumn()
  priceList: PriceTable;
}
