import { AuditFieldsEnum } from '../../enums/auditfields.enum';

export interface IBaseAuditFilter {
  fieldAudit?: AuditFieldsEnum;
  startDateAudit?: string;
  endDateAudit?: string;
}
