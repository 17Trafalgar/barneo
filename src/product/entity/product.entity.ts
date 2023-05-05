import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PriceTable } from './price.entity';
import { Image } from './images.entity';

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

  @Column({ nullable: true })
  productAilability?: string;

  @OneToMany(() => Image, (image) => image.product, { cascade: true })
  images: Image[];

  @OneToOne(() => PriceTable, (priceTable: PriceTable) => priceTable.product, {
    cascade: true,
  })
  @JoinColumn()
  priceList: PriceTable;
}
