import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseModel } from '../../models/base.model';

@Entity('todos')
export class TodoModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  done: boolean;
}
