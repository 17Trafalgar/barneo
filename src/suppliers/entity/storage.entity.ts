import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { SupplierEntity } from './supplier.entity';

@Entity(`storages`)
export class StorageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @OneToMany(
    () => SupplierEntity,
    (dataOfSupplier: SupplierEntity) => dataOfSupplier.storage,
  )
  supplier?: SupplierEntity;

  @Column({ nullable: true })
  city: string;

  @Column({ type: 'simple-array', nullable: true })
  url: string;
}
