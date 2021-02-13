import { IGetAllResult } from '../../interfaces/getallresult';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseModel } from '../models/base.model';

export interface IBaseRepository<T extends BaseModel> {
  create(tenantId: string, userId: string, object: DeepPartial<T>): Promise<T>;
  getById(
    tenantid: string,
    id: string,
    relations?: string[],
    withDeleted?: boolean,
  ): Promise<T>;

  getAll(
    tenantId: string,
    filters: any,
    relations?: string[],
  ): Promise<IGetAllResult>;

  updateById(
    tenantId: string,
    userId: string,
    id: string,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<boolean>;

  deleteById(tenantId: string, id: string): Promise<boolean>;
  removeById(tenantId: string, id: string, userId: string): Promise<boolean>;
}
