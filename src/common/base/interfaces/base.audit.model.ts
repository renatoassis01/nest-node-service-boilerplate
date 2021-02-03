export interface IBaseAuditModel {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  userId?: string;
}
