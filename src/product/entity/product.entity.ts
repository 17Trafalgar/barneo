import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { PriceEntity } from './price.entity';
import { Image } from './images.entity';

@Entity(`product`)
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  article: string;

  @Column({ nullable: true })
  productCode: string;

  @Column({ nullable: true })
  articleOfProducer: string;

  @Column({ nullable: true })
  producer: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  productAilability?: string;

  @OneToMany(() => Image, (image) => image.product, { cascade: true })
  images: Image[];

  @OneToOne(
    () => PriceEntity,
    (priceTable: PriceEntity) => priceTable.product,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  priceList: PriceEntity;
}
