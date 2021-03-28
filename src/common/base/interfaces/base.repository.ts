import { IGetByFiltersResult } from '../../interfaces/getbyfiltersresult';
import { DeepPartial } from 'typeorm';
import { BaseModel } from '../models/base.model';
import { FilterRequestDTO } from '../../types/filter.type.dto';

export interface IBaseRepository<T extends BaseModel> {
  store(tenantId: string, userId: string, object: DeepPartial<T>): Promise<T>;
  getById(
    tenantId: string,
    id: string,
    withDeleted?: boolean,
    relations?: string[],
  ): Promise<T>;

  getByFilters(
    tenantId: string,
    filters: FilterRequestDTO<T>,
    relations?: string[],
  ): Promise<IGetByFiltersResult>;

  updateById(
    tenantId: string,
    userId: string,
    id: string,
    partialEntity: DeepPartial<T>,
  ): Promise<T>;

  deleteById(tenantId: string, id: string): Promise<boolean>;
  disableById(tenantId: string, userId: string, id: string): Promise<boolean>;
  enableById(tenantId: string, userId: string, id: string): Promise<boolean>;
}
