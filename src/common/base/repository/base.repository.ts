import {
  AbstractRepository,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IGetAllResult } from '../../interfaces/getallresult';
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

  public async getById(
    tenantId: string,
    id: string,
    relations?: string[],
    withDeleted = false,
  ): Promise<T> {
    const options: FindOneOptions = {
      where: { id, tenantId },
      withDeleted,
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
  public async getAll(
    tenantId: string,
    filters: any,
    relations?: string[],
  ): Promise<IGetAllResult> {
    const {
      page,
      size,
      sortOrder,
      sortParam,
      withDeleted,
      ...fieldsModel
    } = filters;
    const { take, skip } = PaginationUtils.getPaginationTakeAndSkip({
      page,
      size,
    });

    const options: FindManyOptions = {
      where: !!fieldsModel ? { tenantId, ...fieldsModel } : { tenantId },
      withDeleted,
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

  public async updateById(
    tenantId: string,
    userId: string,
    id: string,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<boolean> {
    const result = await this.repository
      .createQueryBuilder()
      .update()
      .set({ ...partialEntity, userId })
      .where({ id, tenantId })
      .execute();

    return result.affected > 0;
  }

  public async deleteById(tenantId: string, id: string): Promise<boolean> {
    const result = await this.repository
      .createQueryBuilder()
      .delete()
      .where({ id, tenantId })
      .execute();

    return result.affected > 0;
  }
  public async removeById(
    tenantId: string,
    id: string,
    userId: string,
  ): Promise<boolean> {
    const updateValues = ({
      deletedAt: new Date(),
      userId,
    } as unknown) as QueryDeepPartialEntity<T>;
    const result = await this.repository
      .createQueryBuilder()
      .update()
      .set(updateValues)
      .where({ id, tenantId })
      .execute();
    return result.affected > 0;
  }
}
