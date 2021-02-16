import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IBaseAuditModel } from '../interfaces/base.audit.model';
import { IBaseTenantModel } from '../interfaces/base.tenant.model';

export abstract class BaseModel implements IBaseAuditModel, IBaseTenantModel {
  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  tenantId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
