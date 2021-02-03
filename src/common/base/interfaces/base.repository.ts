import { DeepPartial } from 'typeorm';
import { BaseModel } from '../models/base.model';

export interface IBaseRepository<T extends BaseModel> {
  create(tenantId: string, object: DeepPartial<T>): Promise<T>;

  //   findAll(): Promise<T[] | undefined>;

  //   //   findManyByProperties(
  //   //     properties: QueryDeepPartialEntity<T>,
  //   //     relations?: string[],
  //   //   ): Promise<T[] | undefined>;

  //   //   delete(object: T): Promise<void>;

  //   //   findByCode(id: number, relations?: string[]): Promise<T | undefined>;

  //   //   findOneByProperties(
  //   //     idOrProperties: number | QueryDeepPartialEntity<T>,
  //   //     relations?: string[],
  //   //   ): Promise<T | undefined>;

  //   //   partialUpdate(
  //   //     id: number,
  //   //     partialEntity: QueryDeepPartialEntity<T>,
  //   //   ): Promise<void>;
}
