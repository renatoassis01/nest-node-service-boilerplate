import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('books')
export class BookModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  isbn: string;

  @Column({ nullable: true })
  author?: string;
}
