import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SupplierEntity } from './supplier.entity';

@Entity()
export class Storages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @OneToMany(
    () => SupplierEntity,
    (dataOfSupplier: SupplierEntity) => dataOfSupplier.storage,
  )
  dataOfSupplier?: SupplierEntity;

  @Column({ nullable: true })
  city: string;

  @Column({ type: 'simple-array', nullable: true })
  url: string;
}
