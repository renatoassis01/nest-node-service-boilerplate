import { AuditFieldsEnum } from '../../enums/auditfields.enum';
import { IBaseAuditFilterDTO } from './base.audit.filter.dto';
import { IBaseOrderByDTO } from './base.orderby.dto';
import { IBasePaginationDTO } from './base.pagination.dto';
import { IBasePatternDTO } from './base.pattern.dto';

export interface IBaseFilter
  extends IBaseOrderByDTO,
    IBasePaginationDTO,
    IBasePatternDTO,
    IBaseAuditFilterDTO {
  withDeleted?: boolean;
  withRelations?: boolean;
}
