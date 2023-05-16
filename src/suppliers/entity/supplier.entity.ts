import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Storages } from './storage.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  typeFile: string;

  @Column()
  urlFile: string;

  @Column()
  parser: string;

  @Column({ nullable: true })
  encoding: string;

  @ManyToOne(() => Storages, (storage: Storages) => storage.dataOfSupplier, {
    cascade: true,
  })
  storage?: Storages[];
}
