import { IFindManyResult } from '../../../common/interfaces/findmanyresult';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseModel } from '../models/base.model';

export interface IBaseRepository<T extends BaseModel> {
  create(tenantId: string, userId: string, object: DeepPartial<T>): Promise<T>;
  findById(tenantid: string, id: string, relations?: string[]): Promise<T>;

  findAll(
    tenantId: string,
    filters: any,
    relations?: string[],
  ): Promise<IFindManyResult>;

  partialUpdate(
    tenantid: string,
    userId: string,
    id: string,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<boolean>;
}
