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

  @Column({ nullable: true })
  parser: string;

  @ManyToOne(() => Storages, (storage: Storages) => storage.dataOfSupplier, {
    cascade: true,
  })
  storage?: Storages[];
}
