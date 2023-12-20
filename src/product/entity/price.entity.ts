import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity(`prices`)
export class PriceEntity extends BaseEntity {
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

  @OneToOne(
    () => ProductEntity,
    (product: ProductEntity) => product.priceList,
    { cascade: true },
  )
  @JoinColumn()
  product: ProductEntity;
}
