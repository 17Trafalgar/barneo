import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity(`images`)
export class ImageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  url: string;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  product: ProductEntity;
}
