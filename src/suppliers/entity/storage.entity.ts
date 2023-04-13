import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Supplier } from './supplier.entity';

@Entity()
export class Storages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @OneToMany(
    () => Supplier,
    (dataOfSupplier: Supplier) => dataOfSupplier.storage,
  )
  dataOfSupplier: Supplier;

  @Column({ nullable: true })
  city: string;

  @Column({ type: 'simple-array', nullable: true })
  url: string;
}
