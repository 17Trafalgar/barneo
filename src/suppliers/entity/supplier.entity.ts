import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Storages } from './storage.entity';

@Entity()
export class SupplierEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  typeFile: string;

  @Column({ nullable: true })
  urlFile: string;

  @Column({ nullable: true })
  parser: string;

  @Column({ nullable: true })
  encoding: string;

  @ManyToOne(() => Storages, (storage: Storages) => storage.dataOfSupplier, {
    cascade: true,
  })
  storage: Storages[];
}
