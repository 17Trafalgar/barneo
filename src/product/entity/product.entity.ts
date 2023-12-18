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
import { ImageEntity } from './images.entity';

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

  @OneToMany(() => ImageEntity, (image) => image.product, { cascade: true })
  images: ImageEntity[];

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
