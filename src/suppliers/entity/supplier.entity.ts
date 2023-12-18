import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { StorageEntity } from './storage.entity';

@Entity(`suppliers`)
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

  @ManyToOne(
    () => StorageEntity,
    (storage: StorageEntity) => storage.supplier,
    {
      onDelete: 'CASCADE',
    },
  )
  storage: StorageEntity[];
}
