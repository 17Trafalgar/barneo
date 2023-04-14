import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @OneToMany(() => Storages, (storage: Storages) => storage.dataOfSupplier, {
    cascade: true,
  })
  storage?: Storages[];
}
