import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
