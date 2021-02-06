import {
  AbstractRepository,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IFindManyResult } from '../../interfaces/findmanyresult';
import { PaginationUtils } from '../../utils/pagination.utils';
import { QueryUtils } from '../../utils/query.utils';
import { IBaseRepository } from '../interfaces/base.repository';
import { BaseModel } from '../models/base.model';

export class BaseRepository<T extends BaseModel>
  extends AbstractRepository<T>
  implements IBaseRepository<T> {
  public async create(
    tenantId: string,
    userId: string,
    object: DeepPartial<T>,
  ): Promise<T> {
    const model = this.repository.create({ tenantId, userId, ...object });
    return this.repository.save<any>(model);
  }

  /**
   * busca generica. Não busca registros inatívos
   * @param tenantid
   * @param id
   * @param relations
   */
  public async findById(
    tenantId: string,
    id: string,
    relations?: string[],
  ): Promise<T> {
    const options: FindOneOptions = {
      where: { id, tenantId },
      relations,
    };
    return await this.repository.findOne(options);
  }

  /**
   * busca generica. Não busca registros inatívos
   * @param tenantid
   * @param filters
   * @param relations
   */
  public async findAll(
    tenantId: string,
    filters: any,
    relations?: string[],
  ): Promise<IFindManyResult> {
    const { page, size, sortOrder, sortParam, ...rest } = filters;
    const { take, skip } = PaginationUtils.getPaginationTakeAndSkip({
      page,
      size,
    });

    const options: FindManyOptions = {
      where: !!rest ? { tenantId, ...rest } : { tenantId },
      order: QueryUtils.buildOrderBy({ sortOrder, sortParam }),
      take,
      skip,
      relations,
    };
    const [data, count] = await this.repository.findAndCount(options);
    return PaginationUtils.buildPaginatedFindMany({
      data,
      count,
      page,
      size,
    });
  }

  public async partialUpdate(
    tenantId: string,
    userId: string,
    id: string,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<boolean> {
    const result = await this.repository
      .createQueryBuilder()
      .update()
      .set(partialEntity)
      .where({ id, userId, tenantId })
      .execute();

    return result.affected > 0;
  }
}
