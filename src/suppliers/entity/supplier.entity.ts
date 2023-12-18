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

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  typeFile: string;

  @Column({ nullable: false })
  urlFile: string;

  @Column({ nullable: false })
  parser: string;

  @Column({ nullable: true })
  encoding: string;

  @ManyToOne(() => Storages, (storage: Storages) => storage.supplier, {
    onDelete: 'CASCADE',
  })
  storage: Storages[];
}
