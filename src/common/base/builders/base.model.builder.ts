import { FakerUtils } from '../../utils/faker.utils';
import { IBaseBuilder } from '../interfaces/base.builder';

export class BaseModelBuiler<T, U> implements IBaseBuilder<T, U> {
  protected builder: any;
  private instance: any;
  constructor() {
    this.builder = {};
    this.instance = this;
  }

  withId(id?: string): T {
    this.builder.id = id ? id : FakerUtils.faker().random.uuid();
    return this.instance;
  }
  withTenantId(tenantId?: string): T {
    this.builder.tenantId = tenantId
      ? tenantId
      : FakerUtils.faker().random.uuid();
    return this.instance;
  }
  withCreateAt(createdAt?: Date): T {
    this.builder.createdAt = createdAt ? createdAt : new Date();
    return this.instance;
  }
  withUpdatedAt(updatedAt?: Date): T {
    this.builder.updateAt = updatedAt ? updatedAt : new Date();
    return this.instance;
  }
  withDeletedAt(deletedAt?: Date): T {
    this.builder.deletedAt = deletedAt ? deletedAt : null;
    return this.instance;
  }
  withUserId(userId?: string): T {
    this.builder.userId = userId ? userId : FakerUtils.faker().random.uuid();
    return this.instance;
  }

  build(): U {
    return this.builder;
  }
}
