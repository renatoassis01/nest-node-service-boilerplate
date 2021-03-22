import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ValidateIf, IsNotEmpty, IsEnum, IsBoolean } from 'class-validator';
import { AuditFieldsEnum } from '../../../enums/auditfields.enum';
import { DateFormatEnum } from '../../../enums/dateformat.enum';
import { DateUtils } from '../../../utils/date.utils';
import { TransformUtils } from '../../../utils/transform.utils';
import { IBaseAuditFilterDTO } from '../../interfaces/base.audit.filter.dto';
import { BaseGetByFiltersRequestDTO } from './base.getbyfilters.dto';

export class BaseGetByFiltersWithAuditRequestDTO
  extends BaseGetByFiltersRequestDTO
  implements IBaseAuditFilterDTO {
  @ApiPropertyOptional({
    description: 'Record field audit date',
    enum: AuditFieldsEnum,
  })
  @ValidateIf((prop) => !!prop.startDateAudit || !!prop.endDateAudit)
  @IsNotEmpty()
  @IsEnum(AuditFieldsEnum, {
    message: `fieldAudit must be createdAt or updatedAt or deletedAt`,
  })
  fieldAudit?: AuditFieldsEnum;

  @ApiPropertyOptional({
    description: 'Record audit date start',
    type: Date,
  })
  @Transform(({ value }) =>
    DateUtils.formatDateToString(value, DateFormatEnum.YYYY_MM_DD),
  )
  @ValidateIf((prop) => !!prop.fieldAudit || !!prop.endDateAudit)
  @IsNotEmpty()
  startDateAudit?: string;

  @ApiPropertyOptional({
    description: 'Record audit date start',
    type: Date,
  })
  @Transform(({ value }) =>
    DateUtils.formatDateToString(value, DateFormatEnum.YYYY_MM_DD),
  )
  @ValidateIf((prop) => !!prop.fieldAudit || !!prop.startDateAudit)
  @IsNotEmpty()
  endDateAudit?: string;

  @ApiPropertyOptional({
    description: 'Records deleteds',
    type: Boolean,
  })
  @Transform((obj) => TransformUtils.ToBoolean(obj))
  @ValidateIf(
    (prop) =>
      !!prop.fieldAudit && prop.fieldAudit === AuditFieldsEnum.DELETED_AT,
  )
  @IsNotEmpty({ message: 'must be true if fieldAudit equal deleteAt' })
  @IsBoolean()
  withDeleted?: boolean;
}
