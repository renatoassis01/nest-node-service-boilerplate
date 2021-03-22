import { AuditFieldsEnum } from '../../enums/auditfields.enum';

export interface IBaseAuditFilterDTO {
  fieldAudit?: AuditFieldsEnum;
  startDateAudit?: string;
  endDateAudit?: string;
  withDeleted?: boolean;
}
