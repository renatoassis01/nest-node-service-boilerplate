import { BaseModel } from '../models/base.model';

export interface IBaseBuilder<T, U> {
  withId(id?: string): T;
  withTenantId(tenantId?: string): T;
  withCreateAt(createdAt?: Date): T;
  withUpdatedAt(updatedAt?: Date): T;
  withDeletedAt(deletedAt?: Date): T;
  withUserId(userId: string): T;
  build(): U;
}
