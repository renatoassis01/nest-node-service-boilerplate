import { AuditFieldsEnum } from '../../enums/auditfields.enum';
import { IBaseAuditFilter } from './base.audit.filter';
import { IBaseOrderByDTO } from './base.orderby.dto';
import { IBasePaginationDTO } from './base.pagination.dto';
import { IBasePatternDTO } from './base.pattern.dto';

export interface IBaseFilter
  extends IBaseOrderByDTO,
    IBasePaginationDTO,
    IBasePatternDTO,
    IBaseAuditFilter {
  withDeleted?: boolean;
  withRelations?: boolean;
}
