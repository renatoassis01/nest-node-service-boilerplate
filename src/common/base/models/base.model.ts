import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IBaseAuditModel } from '../interfaces/base.audit.model';
import { IBaseTenantIdModel } from '../interfaces/base.tenantid.model';

export abstract class BaseModel implements IBaseAuditModel, IBaseTenantIdModel {
  @Column({ type: 'uuid' })
  tenantid: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
