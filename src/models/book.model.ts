import { BaseModel } from 'src/common/base/models/base.model';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('books')
export class BookModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @Column()
  name: string;

  @Column()
  isbn: string;

  @Column({ nullable: true })
  author?: string;
}
