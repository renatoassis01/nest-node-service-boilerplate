import {
  AbstractRepository,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IBaseRepository } from './interfaces/base.repository';
import { BaseModel } from './models/base.model';

export class BaseRepository<T extends BaseModel>
  extends AbstractRepository<T>
  implements IBaseRepository<T> {
  public async create(tenantId: string, object: DeepPartial<T>): Promise<T> {
    const model = this.repository.create({ tenantid: tenantId, ...object });
    return this.repository.save<any>(model);
  }

  public async findById(
    tenantId: string,
    id: string,
    relations?: string[],
  ): Promise<T> {
    const options: FindOneOptions = {
      where: { id, tenantid: tenantId },
      relations,
    };
    return await this.repository.findOne(options);
  }

  public async findAll(
    tenantid: string,
    properties: QueryDeepPartialEntity<T>,
    relations?: string[],
  ): Promise<T[] | undefined> {
    const options: FindManyOptions = {
      where: { tenantid, ...properties },
      relations,
    };
    return await this.repository.find(options);
  }

  public async partialUpdate(
    id: number,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<void> {
    await this.repository.update(id, partialEntity);
  }
}
